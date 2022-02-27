import { IAttribute } from '@/interfaces';
import { configConstants } from '@/constants';
import React from 'react';
import { map, merge } from 'lodash';
import {
  MeshBasicMaterial,
  TextureLoader,
  Color,
  Texture,
  MeshStandardMaterial,
  Scene,
  AnimationMixer,
  Raycaster,
  RepeatWrapping,
} from 'three';
import { commonHelpers } from '.';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { v4 as uuidv4 } from 'uuid';

const update3DSceneByKey = (
  attrData: IAttribute,
  object: any,
  videos: any[],
  setVideos: any,
  assetType: string,
  objectAttribute: any = null
) => {
  switch (assetType) {
    case configConstants.assetTypes.IMAGE:
    case configConstants.assetTypes.VIDEO:
      attrData.value = attrData.value
        ? attrData.value
        : '/noimage-thumb-3d.png';
      const src = attrData.value;
      const videoId = videos.findIndex(item => item.key === attrData.key);
      if (commonHelpers.isVideo(src)) {
        if (objectAttribute && videoId > -1) {
          videos[videoId].ref.current.setAttribute('src', src);
        } else {
          const videoRef = React.createRef<any>();
          const video: any = {};
          video.key = attrData.key;
          video.html = (
            <video
              style={{ display: 'none' }}
              key={uuidv4()}
              id={attrData.key + '-video'}
              ref={videoRef}
              autoPlay={true}
              muted
              crossOrigin="anonymous"
              loop
              playsInline
            >
              <source
                src={src}
                type='video/mp4; codecs="avc1.42E01E, mp4a.40.2'
              />
            </video>
          );
          video.object = object;
          video.ref = videoRef;
          setVideos((videos: any[]) => [...videos, video]);
        }
      } else {
        if (object && object.material) {
          const loader = new TextureLoader();
          loader.setCrossOrigin('anonymous');
          loader.load(src, texture => {
            const material = new MeshBasicMaterial({
              map: texture,
            });
            object.material = material;
            object.material.map.wrapS = 1000;
            object.material.map.wrapT = 1000;
            object.material.map.flipY = false;
          });
        }
        if (videoId > -1) {
          setVideos(videos.filter(item => item.key !== attrData.key));
        }
      }
      break;
    case configConstants.assetTypes.COLOR:
      const material = new MeshBasicMaterial({
        color: new Color(attrData.value.value),
      });
      object.material = material;
      break;
    case configConstants.assetTypes.TEXT:
      {
        const canvas = document.createElement('canvas');
        canvas.height = 20;
        canvas.width = 150;
        const ctx = canvas.getContext('2d');
        ctx!.font = 'normal 700 9px Arial';
        ctx!.textAlign = 'center';
        ctx!.textBaseline = 'middle';
        ctx!.fillStyle = 'white';
        let txt = attrData?.value?.name || attrData?.value?.text;
        if (!txt) return;
        txt = txt.toUpperCase();
        ctx!.fillText(txt, canvas.width / 2, canvas.height / 2);

        const texture = new Texture(canvas);
        texture.needsUpdate = true;

        const material = new MeshStandardMaterial({
          map: texture,
          metalness: 0.4,
          roughness: 0.1,
          transparent: true,
        });
        object.material = material;
        object.material.map.wrapS = 1000;
        object.material.map.wrapT = 1000;
        object.material.map.flipY = false;
      }
      break;
    case configConstants.assetTypes.TEXTURE_OPTIONS:
      if (attrData.presetValue) {
        let value = attrData.value?.value;
        if (!value) {
          value = attrData.presetValue.find(
            item => item.name === attrData.value.name
          );
          value = value?.value;
        }
        if (value) {
          const loader = new TextureLoader();
          loader.setCrossOrigin('anonymous');
          loader.load(value.image, texture => {
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;
            texture.flipY = false;
            texture.repeat.set(value.repeat.x, value.repeat.y);
            texture.offset.set(value.offset.x, value.offset.y);
            const material = new MeshBasicMaterial({
              map: texture,
            });
            object.material = material;
          });
        }
      }
      break;
    default:
      break;
  }
};

const mapAssetsTo3DScene = (scene: any) => {
  const attributes = scene.attributes || {};
  scene.assets?.forEach((asset: any) => {
    const { id, value, key } = asset;
    attributes[key] = {
      ...attributes[key],
      ...asset,
      value: `${configConstants.ASSETS_URL}/assets/${id}/${value}`,
    };
  });
  map(scene.sceneTemplate.attributes, (attrData, key) => {
    if (
      attrData.assetType === configConstants.assetTypes.GROUP_SCENE &&
      scene[key]?.length
    ) {
      const boothNumber = attributes[key]?.boothNumber ?? attrData?.boothNumber;
      if (boothNumber && !attrData.items.length) {
        attrData.items = Array(boothNumber).fill(false);
      } else {
        if (boothNumber - attrData.items.length < 0 && boothNumber) {
          attrData.items = attrData.items.slice(0, boothNumber);
        } else if (boothNumber - attrData.items.length > 0 && boothNumber) {
          attrData.items = attrData.items.concat(
            Array(boothNumber - attrData.items.length).fill(false)
          );
        }
      }
      scene[key].forEach((item: any) => {
        attrData.items.splice(item.sceneModels.index, 1, {
          ...attrData.items[item.sceneModels.index],
          value: item,
        });
      });
      attributes[key] = merge({}, attrData, attributes[key]);
    }
  });
  scene.attributes = attributes;
  return scene;
};

const clearScene = (object: any) => {
  while (object.children.length > 0) {
    clearScene(object.children[0]);
    object.remove(object.children[0]);
  }
  if (object.geometry) object.geometry.dispose();

  if (object.material) {
    object.material.dispose();
  }
};

interface LoadExternalModelProps {
  scene: Scene;
  attributes?: { [key: string]: IAttribute };
  pos: number[];
  mixers?: any;
  scale?: number;
  allCharacter?: any[];
  setLoadedPercent?: Function;
  percentAdd?: number;
}

const loadExternalModel = ({
  scene,
  attributes,
  pos,
  mixers,
  scale,
  allCharacter,
  setLoadedPercent,
  percentAdd,
}: LoadExternalModelProps) => {
  const loader = new GLTFLoader();
  map(attributes, attrData => {
    if (attrData.assetType === configConstants.assetTypes.EXTERNAL) {
      if (attrData.type === 'gltf') {
        loader.load(attrData?.value?.src, data => {
          const object = data.scene;
          object.position.set(
            attrData.value.position[0] + pos[0],
            attrData.value.position[1] + pos[1],
            attrData.value.position[2] + pos[2]
          );
          if (attrData.value.scale) {
            if (scale) {
              object.scale.set(
                attrData.value.scale[0] * scale,
                attrData.value.scale[1] * scale,
                attrData.value.scale[2] * scale
              );
              object.position.set(
                attrData.value.position[0] * scale + pos[0],
                attrData.value.position[1] * scale + pos[1],
                attrData.value.position[2] * scale + pos[2]
              );
            } else {
              object.scale.set(
                attrData.value.scale[0],
                attrData.value.scale[1],
                attrData.value.scale[2]
              );
              object.position.set(
                attrData.value.position[0] + pos[0],
                attrData.value.position[1] + pos[1],
                attrData.value.position[2] + pos[2]
              );
            }
          }
          if (attrData.value.rotation) {
            object.rotation.set(
              attrData.value.rotation[0],
              attrData.value.rotation[1],
              attrData.value.rotation[2]
            );
          }

          scene.add(object);
          if (percentAdd && setLoadedPercent) {
            setLoadedPercent(
              (loadedPercent: any) => loadedPercent + percentAdd
            );
          }

          if (Array.isArray(allCharacter)) {
            allCharacter.push(object);
          }
          if (data.animations && data.animations.length > 0) {
            if (!mixers) mixers = [];
            const mixer: any = {};
            mixer.a = new AnimationMixer(object);
            mixer.o = object;
            if (attrData.value.path) {
              mixer.c = attrData.value.path;
            }
            mixer.a.clipAction(data.animations[0]).play();
            mixers.push(mixer);
          }
        });
      }
    }
  });
};

const hoverMouse = (
  e: any,
  width: number,
  height: number,
  camera: any,
  object: any,
  attributes: any,
  modelKey?: string
) => {
  const mouse: any = {};
  mouse.x = 2 * (e.clientX / width) - 1;
  mouse.y = 1 - 2 * ((e.clientY - 70) / height);
  const raycaster = new Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(object.children, true);
  if (intersects[0]) {
    if (modelKey) {
      const o = intersects[0].object;
      let dataItem = attributes[modelKey][o.name];
      if (dataItem) {
        document.body.style.cursor = 'pointer';
      } else {
        dataItem =
          attributes[modelKey].subAttributes &&
          attributes[modelKey].subAttributes[o.name];
        if (dataItem) {
          document.body.style.cursor = 'pointer';
        } else {
          document.body.style.cursor = 'default';
        }
      }
    } else {
      const o = intersects[0].object;
      const dataItem = attributes[o.name];
      if (dataItem) {
        if (dataItem.assetType !== 'color') {
          document.body.style.cursor = 'pointer';
        }
      } else {
        document.body.style.cursor = 'default';
      }
    }
  } else {
    document.body.style.cursor = 'default';
  }
};

export default {
  update3DSceneByKey,
  mapAssetsTo3DScene,
  clearScene,
  loadExternalModel,
  hoverMouse,
};
