import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Progress } from 'antd';
import {
  ProgressWrapper,
  SceneWrapper,
  SceneContainer,
  ScenePreview,
} from '@/components/styles/3DScene';
import { IAttribute, IHall, ModelType, IModelItem, IBooth } from '@/interfaces';
import { useCommonStores, useMainSiteStores } from '@/hooks';
import { useHistory, useParams } from 'react-router-dom';
import { commonHelpers, sceneHelpers } from '@/helpers';
import { merge } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import theme from '@/styles/theme';
import BoothPopover from '@/components/common/BoothPopover';
import KeyControls from '@/components/common/KeyControls';
import NavigationButton from '@/components/common/NavigationButton';
import ReactImageVideoLightbox from '@/components/common/ImageVideoLightbox';
// Three
import {
  Scene,
  Cache,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  Group,
  Raycaster,
  Vector3,
  VideoTexture,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { configConstants } from '@/constants';

interface ParamTypes {
  id: string;
}

interface PutBox2HallProps {
  boxNumber: number;
  boxWidth: number;
  boxDepth: number;
  spaceX: number;
  spaceY: number;
  floorWidth: number;
  floorDepth: number;
  object: any;
  id: number;
}

let currentDataBooth: any = [];
const pageSize = 10;
let isMove: boolean = true;
let touchCurrent: any;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let controls: OrbitControls;

const areaSetting = {
  boxWidth: 3.5,
  boxDepth: 2.8,
  spaceX: 3.1,
  spaceY: 11.3,
  floorWidth: 29,
  floorDepth: 38,
};

const Hall: React.FC = observer(() => {
  const history = useHistory();
  const { t } = useTranslation();
  const { hallStore, boothStore } = useMainSiteStores();
  const { authStore, chatStore } = useCommonStores();
  const { id: hallId } = useParams<ParamTypes>();
  const isMobile = useMediaQuery({
    query: '(max-device-width: 767px)',
  });
  const [hall, setHall] = useState<IHall>();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [attributes, setAttributes] = useState<{
    [key: string]: { [key: string]: IAttribute };
  }>({});
  const [scene, setScene] = useState<Scene>();
  const [loadedPercent, setLoadedPercent] = useState<number>(0);
  const [videos, setVideos] = useState<any[]>([]);
  const [loadedBooths, setLoadedBooths] = useState<{ [key: number]: IBooth }>(
    {}
  );
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>();
  const [popupId, setPopupId] = useState<number | null>(null);
  const [positionPopup, setPositionPopup] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [hideZoom, setHideZoom] = useState<string | null>(null);
  const [hidePan, setHidePan] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [imageVideoLightbox, setImageVideoLightbox] = useState<ReactNode>();
  const [startTrackTime, setStartTrackTime] = useState<number>(0);

  const extractAttributes = (model: ModelType) => {
    const { sceneTemplate } = model;
    const attributes = merge({}, sceneTemplate.attributes, model.attributes);
    model.key = uuidv4();
    setAttributes(origin => {
      origin[model.key!] = attributes;
      return origin;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await hallStore.getHall(+hallId!);
      if (res && !hallStore.error) {
        const hall = sceneHelpers.mapAssetsTo3DScene(res.hall);
        extractAttributes(hall);
        setHall(hall);
      } else {
        history.push('/');
      }
    };
    fetchData();
    return () => {
      setScene(undefined);
      setAttributes({});
      setContainerSize(undefined);
      setHall(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const a = new Date().getTime();
    if (!startTrackTime) {
      setStartTrackTime(a);
    }
    return () => {
      if (startTrackTime) {
        chatStore.sendEvent('ADD_TIMER_COLLECTOR', {
          count: new Date().getTime() - startTrackTime,
          userId: authStore.userInfo?.id,
          hallId: hallId,
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTrackTime]);

  useEffect(() => {
    const payload = {
      userId: authStore.userInfo?.id,
      hallId: +hallId,
      device: commonHelpers.isMobile() ? 'MOBILE' : 'BROWSER',
    };
    chatStore.sendEvent('VISIT', payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hall) return;
    if (!scene) {
      setScene(new Scene());
    }
    setContainerSize({
      width: containerRef.current?.clientWidth!,
      height: containerRef.current?.clientHeight!,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current, hall]);

  useEffect(() => {
    if (!scene) return;
    if (!containerSize) return;
    if (!hall) return;
    if (scene.children.length) return;
    const width = containerSize.width;
    const height = containerSize.height;
    Cache.enabled = false;
    camera = new PerspectiveCamera(35, width / height, 0.45, 20000);
    renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    loadHallScene(camera);

    const alight = new AmbientLight(0xeeeeee, 1);
    scene.add(alight);
    controls = new OrbitControls(camera, renderer.domElement);
    const sceneCam = hall.sceneTemplate?.data?.camera;
    if (sceneCam) {
      camera.fov = sceneCam.fov;
      sceneCam.position = {
        x: sceneCam.position.x,
        y: sceneCam.position.y,
        z: isMobile
          ? (sceneCam.position.z < 35 && sceneCam.position.z + 4) ||
            sceneCam.position.z
          : sceneCam.position.z,
      };
      camera.position.set(
        sceneCam.position.x,
        sceneCam.position.y,
        sceneCam.position.z
      );
      controls.target.set(
        sceneCam.orbitTarget.x,
        sceneCam.orbitTarget.y,
        sceneCam.orbitTarget.z
      );
    }
    controls.minDistance = 17;
    controls.maxDistance = isMobile ? 40 : 39;
    controls.update();

    // Need research
    const initPolar = controls.getPolarAngle();
    controls.maxPolarAngle = initPolar;
    controls.minPolarAngle = initPolar;
    controls.maxAzimuthAngle = Math.PI / 2;
    controls.minAzimuthAngle = -Math.PI / 2;

    renderer.setClearColor('#ccc');
    renderer.setSize(width, height);

    const renderScene = () => {
      if (controls) {
        controls.update();
      }
      renderer.render(scene, camera);
    };

    let frameId: any = null;

    const handleResize = () => {
      const width = sceneRef?.current?.clientWidth!;
      const height = sceneRef?.current?.clientHeight!;
      if (width && height) {
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderScene();
      }
    };

    const animate = () => {
      renderScene();
      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = null;
    };

    sceneRef?.current?.appendChild(renderer.domElement);
    window.addEventListener('resize', handleResize);
    start();

    return () => {
      stop();
      renderer.renderLists.dispose();
      window.removeEventListener('resize', handleResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sceneRef.current?.removeChild(renderer.domElement);
      sceneHelpers.clearScene(scene);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerSize]);

  useEffect(() => {
    if (!scene) return;
    if (!currentDataBooth) return;
    currentDataBooth.forEach((booth: any) => {
      scene.remove(booth.object);
      sceneHelpers.clearScene(booth.object);
      if (booth.characters) {
        booth.characters.forEach((character: any) => {
          scene.remove(character);
          sceneHelpers.clearScene(character);
        });
      }
    });
    currentDataBooth = [];
    if (!containerSize) return;
    loadBooths(attributes[(hall as any).key].booths.items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadHallScene = (camera: PerspectiveCamera) => {
    if (!scene) return;
    if (!hall) return;
    const loader = new GLTFLoader();
    const src = `/sceneTemplates/${hall.sceneTemplate.id}/${hall.sceneTemplate.path}`;
    loader.load(
      src,
      data => {
        const object = data.scene;
        scene.add(object);
        sceneHelpers.loadExternalModel({
          scene,
          attributes: attributes[(hall as any).key],
          pos: [0, 0, 0],
        });
        traverseScene((hall as any).key, object);

        function raycast(
          e: any,
          camera: PerspectiveCamera,
          object: any,
          action: string
        ) {
          const raycaster = new Raycaster();
          const mouse: any = {};
          if (e.changedTouches) {
            mouse.x =
              2 * (e.changedTouches[0].clientX / containerSize?.width!) - 1;
            mouse.y =
              1 -
              2 * ((e.changedTouches[0].clientY - 70) / containerSize?.height!);
          } else {
            mouse.x = 2 * (e.clientX / containerSize?.width!) - 1;
            mouse.y = 1 - 2 * ((e.clientY - 70) / containerSize?.height!);
          }

          // update the picking ray with the camera and mouse position
          if (camera) {
            raycaster.setFromCamera(mouse, camera);
          }
          // calculate objects intersecting the picking ray
          if (action === 'down') {
            isMove = false;
          }
          if (action === 'up' && !isMove) {
            const intersects = raycaster.intersectObjects(
              object.children,
              true
            );
            if (intersects[0]) {
              const o = intersects[0].object;
              objectClick((hall as any).key, o);
            }
          }
        }

        function raycastTouchHall(
          e: any,
          camera: PerspectiveCamera,
          object: any,
          action: string
        ) {
          const raycaster = new Raycaster();
          const mouse: any = {};
          if (e.changedTouches) {
            mouse.x =
              2 * (e.changedTouches[0].clientX / containerSize?.width!) - 1;
            mouse.y =
              1 -
              2 * ((e.changedTouches[0].clientY - 70) / containerSize?.height!);
          } else {
            mouse.x = 2 * (e.clientX / containerSize?.width!) - 1;
            mouse.y = 1 - 2 * ((e.clientY - 70) / containerSize?.height!);
          }
          // update the picking ray with the camera and mouse position

          if (action === 'down') {
            touchCurrent = {
              x: mouse.x,
              y: mouse.y,
            };
          }
          if (
            action === 'up' &&
            touchCurrent?.x === mouse.x &&
            touchCurrent?.y === mouse.y
          ) {
            raycaster.setFromCamera(mouse, camera);
            // calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects(
              object.children,
              true
            );
            if (intersects[0]) {
              const o = intersects[0].object;
              objectClick((hall as any).key, o);
            }
          }
        }

        if (containerRef.current && attributes) {
          containerRef.current.addEventListener(
            'mousedown',
            e => raycast(e, camera, scene, 'down'),
            false
          );
          containerRef.current.addEventListener(
            'mouseup',
            e => raycast(e, camera, scene, 'up'),
            false
          );
          containerRef.current.addEventListener(
            'mousemove',
            e => raycastHover(e, camera, object, attributes, (hall as any).key),
            false
          );
          containerRef.current.addEventListener(
            'touchstart',
            e => raycastTouchHall(e, camera, scene, 'down'),
            false
          );
          containerRef.current.addEventListener(
            'touchend',
            e => raycastTouchHall(e, camera, scene, 'up'),
            false
          );
        }

        loadBooths(attributes[(hall as any).key].booths.items);
      },
      ({ loaded, total }) => {
        setLoadedPercent(Math.round((loaded / total) * 100));
      }
    );
  };

  const raycastHover = (
    e: any,
    camera: PerspectiveCamera,
    object: any,
    attributes: any,
    modelKey: string
  ) => {
    isMove = true;
    sceneHelpers.hoverMouse(
      e,
      containerSize?.width!,
      containerSize?.height!,
      camera,
      object,
      attributes,
      modelKey
    );
    setPopupId(null);
    setPositionPopup({ top: 0, left: 0 });
  };

  const objectClick = (modelKey: string, object: any) => {
    document.body.style.cursor = 'default';
    const dataItem = attributes[modelKey][object.name];
    if (!dataItem) return;
    chatStore.sendEvent('ADD_CLICK_COLLECTOR', {
      type: object.name,
      name: dataItem.name,
      userId: authStore.userInfo?.id,
      hallId: hallId,
    });
    switch (dataItem.assetType) {
      case configConstants.assetTypes.IMAGE:
      case configConstants.assetTypes.VIDEO:
      case configConstants.assetTypes.TEXT:
        if (!dataItem.action) return;
        const type = dataItem?.action?.type;
        if (!type || type === configConstants.elementActions.POPUP) {
          setImageVideoLightbox(
            dataItem.key && dataItem.value ? (
              <ReactImageVideoLightbox
                style={{ zIndex: '1000px', padding: 50 }}
                data={[
                  {
                    url: dataItem.value,
                    type: commonHelpers.isVideo(dataItem.value)
                      ? 'video'
                      : 'photo',
                    altTag: 'some image',
                  },
                ]}
                startIndex={0}
                showResourceCount={false}
                onCloseCallback={() => {
                  setImageVideoLightbox(<></>);
                }}
              />
            ) : (
              <></>
            )
          );
        } else if (type === configConstants.elementActions.NEWLINK) {
          window.open(dataItem.action.url, '_blank');
        }
        break;
      default:
        break;
    }
  };

  const traverseScene = (modelKey: string, object: Group) => {
    object.traverse((child: any) => {
      if (attributes[modelKey][child.name]) {
        const dataItem = attributes[modelKey][child.name];
        if (!dataItem?.value) return;
        update3D(modelKey, dataItem, child);
      }
    });
  };

  const loadBooths = (booths: IModelItem[]) => {
    if (!scene) return;
    const { key: hallKey } = hall as any;
    if (attributes[hallKey]?.booths?.boothNumber) {
      if (
        +attributes[(hall as any).key]?.booths?.boothNumber - booths.length <
        0
      ) {
        booths = booths.slice(0, +attributes[hallKey].booths.boothNumber);
      } else {
        booths = booths.concat(
          Array(+attributes[hallKey].booths.boothNumber - booths.length).fill(
            false
          )
        );
      }
      const listBooths = commonHelpers.paginate(booths, pageSize, page);
      const loader = new GLTFLoader();
      listBooths.forEach(async (item, index) => {
        if (item?.value?.id!) {
          let boothData: IBooth | null = null;
          if (loadedBooths[item.value?.id!]) {
            boothData = loadedBooths[item.value?.id!];
          } else {
            const res = await boothStore.getBooth(item.value?.id!);
            if (res?.booth) {
              boothData = res?.booth;
              setLoadedBooths(origin => ({
                ...origin,
                [res?.booth.id]: res?.booth,
              }));
            }
          }
          if (boothData) {
            const booth = sceneHelpers.mapAssetsTo3DScene(boothData);
            if (!booth) return;
            extractAttributes(booth);
            const src = `/sceneTemplates/${booth.sceneTemplate.id}/${booth.sceneTemplate.path}`;
            const {
              boxWidth,
              boxDepth,
              spaceX,
              spaceY,
              floorWidth,
              floorDepth,
            } = areaSetting;
            loader.load(src, data => {
              const object = data.scene;
              traverseScene((booth as any).key, object);
              const boothIndex = putBox2Hall({
                boxNumber: index + 1,
                boxWidth,
                boxDepth,
                spaceX,
                spaceY,
                floorWidth,
                floorDepth,
                object,
                id: booth.id,
              });
              scene.add(boothIndex.object);
              sceneHelpers.loadExternalModel({
                scene,
                attributes: attributes[booth.key],
                pos: [
                  boothIndex.object.position.x,
                  boothIndex.object.position.y,
                  boothIndex.object.position.z,
                ],
                allCharacter: boothIndex.characters,
                scale: boothIndex.scale,
              });

              if (containerRef.current) {
                containerRef.current.addEventListener(
                  'mousedown',
                  e => raycast(e, camera, 'down'),
                  false
                );
                containerRef.current.addEventListener(
                  'mouseup',
                  e => raycast(e, camera, 'up'),
                  false
                );
                containerRef.current.addEventListener('mousemove', e =>
                  raycastHoverEnter(e)
                );

                containerRef.current.addEventListener(
                  'touchstart',
                  e => raycastTouch(e, camera, 'down'),
                  false
                );
                containerRef.current.addEventListener(
                  'touchend',
                  e => raycastTouch(e, camera, 'up'),
                  false
                );
              }
            });
          }
        }
      });
    }
  };

  const raycast = (e: any, camera: PerspectiveCamera, action: string) => {
    const raycaster = new Raycaster();
    const mouse: any = {};
    if (e.changedTouches) {
      mouse.x = 2 * (e.changedTouches[0].clientX / containerSize?.width!) - 1;
      mouse.y =
        1 - 2 * ((e.changedTouches[0].clientY - 70) / containerSize?.height!);
    } else {
      mouse.x = 2 * (e.clientX / containerSize?.width!) - 1;
      mouse.y = 1 - 2 * ((e.clientY - 70) / containerSize?.height!);
    }

    if (action === 'down') {
      isMove = false;
    }
    if (action === 'up' && !isMove) {
      if (camera) {
        raycaster.setFromCamera(mouse, camera);
        currentDataBooth.forEach((booth: any) => {
          const intersects = raycaster.intersectObjects(
            booth.object.children,
            true
          );
          if (intersects[0]) {
            history.push(`/hall/${hallId}/booth/${booth.id}`);
          } else {
            setPopupId(null);
            setPositionPopup({ top: 0, left: 0 });
          }
        });
      }
    }
  };

  const raycastHoverEnter = (e: any) => {
    isMove = true;
    const mouse: any = {};
    mouse.x = 2 * (e.clientX / containerSize?.width!) - 1;
    mouse.y = 1 - 2 * ((e.clientY - 70) / containerSize?.height!);
    const raycaster = new Raycaster();
    // update the picking ray with the camera and mouse position
    if (camera) {
      raycaster.setFromCamera(mouse, camera);
      currentDataBooth.forEach((booth: any) => {
        const intersects = raycaster.intersectObjects(
          booth.object.children,
          true
        );
        if (intersects[0]) {
          const boothPos = booth.object.position;
          const vector = new Vector3(boothPos.x, boothPos.y, boothPos.z);
          vector.project(camera);
          const canvas = renderer?.domElement;
          const toolTipPostion = {
            top:
              Math.round(
                (0.5 - vector.y / 2) *
                  (canvas?.height / window.devicePixelRatio)
              ) - 300,
            left:
              Math.round(
                (0.5 + vector.x / 2) * (canvas?.width / window.devicePixelRatio)
              ) - 180,
          };
          setPopupId(booth.id);
          setPositionPopup(toolTipPostion);

          document.body.style.cursor = 'pointer';
        }
      });
    }
  };

  const raycastTouch = (e: any, camera: PerspectiveCamera, action: string) => {
    if (currentDataBooth.length === 0) return;
    const raycaster = new Raycaster();
    const mouse: any = {};
    if (e.changedTouches) {
      mouse.x = 2 * (e.changedTouches[0].clientX / containerSize?.width!) - 1;
      mouse.y =
        1 - 2 * ((e.changedTouches[0].clientY - 70) / containerSize?.height!);
    } else {
      mouse.x = 2 * (e.clientX / containerSize?.width!) - 1;
      mouse.y = 1 - 2 * ((e.clientY - 70) / containerSize?.height!);
    }
    // update the picking ray with the camera and mouse position

    if (action === 'down') {
      touchCurrent = {
        x: mouse.x,
        y: mouse.y,
      };
    }
    if (
      action === 'up' &&
      touchCurrent?.x === mouse.x &&
      touchCurrent?.y === mouse.y
    ) {
      if (camera) {
        raycaster.setFromCamera(mouse, camera);
        currentDataBooth.forEach((booth: any) => {
          const intersects = raycaster.intersectObjects(
            booth.object.children,
            true
          );
          if (intersects[0]) {
            history.push(`/hall/${hallId}/booth/${booth.id}`);
          } else {
            setPopupId(null);
            setPositionPopup({ top: 0, left: 0 });
          }
        });
      }
    }
  };

  const putBox2Hall = ({
    boxNumber,
    boxWidth,
    boxDepth,
    spaceX,
    spaceY,
    floorWidth,
    floorDepth,
    object,
    id,
  }: PutBox2HallProps) => {
    if (boxNumber < 6) {
      object.position.setX((spaceX * 2 + boxWidth) * boxNumber - floorWidth);
      object.position.setZ(-floorDepth + (spaceY * 2 + boxDepth + 2) + 3);
      object.scale.setX(1);
      object.scale.setY(1);
      object.scale.setZ(1);
      currentDataBooth.push({ object, id, characters: [], scale: 1 });
      return currentDataBooth[currentDataBooth.length - 1];
    } else {
      object.position.setX(
        ((spaceX - 2) * 2 + boxWidth) * (boxNumber - 5) - (floorWidth - 12)
      );
      object.position.setZ(-floorDepth + (spaceY * 2 + boxDepth) * 2 - 2);
      object.scale.setX(0.6);
      object.scale.setY(0.6);
      object.scale.setZ(0.6);
      currentDataBooth.push({ object, id, characters: [], scale: 0.6 });
      return currentDataBooth[currentDataBooth.length - 1];
    }
  };

  const update3D = (modelKey: string, attrData: any, object: any) => {
    const assetType = attrData?.assetType;
    sceneHelpers.update3DSceneByKey(
      attrData,
      object,
      videos,
      setVideos,
      assetType
    );
  };

  useEffect(() => {
    videos.forEach(video => {
      // video.ref.current.play();
      const texture = new VideoTexture(video.ref.current);
      video.object.material.map = texture;
      video.object.material.map.wrapS = 1000;
      video.object.material.map.wrapT = 1000;
      video.object.material.map.flipY = false;
    });
  }, [videos]);

  const vectorMove = (direction: string | null) => {
    if (direction && controls && camera) {
      if (direction !== 'default') {
        if (camera.position.x < -20) {
          setHidePan('left');
          if (direction === 'left') {
            direction = null;
          }
        } else if (camera.position.x > 20) {
          setHidePan('right');
          if (direction === 'right') {
            direction = null;
          }
        } else if (!hidePan) {
          setHidePan(null);
        }

        if (camera.position.z < 2) {
          setHideZoom('in');
        } else if (camera.position.z > 40) {
          setHideZoom('out');
        } else if (!hideZoom) {
          setHideZoom(null);
        }

        switch (direction) {
          case 'up': {
            camera.position.set(
              camera.position.x,
              camera.position.y + 0.5,
              camera.position.z
            );
            controls.target.set(
              controls.target.x,
              controls.target.y + 0.5,
              controls.target.z
            );
            return;
          }
          case 'left': {
            camera.position.set(
              camera.position.x - 0.5,
              camera.position.y,
              camera.position.z
            );
            controls.target.set(
              controls.target.x - 0.5,
              controls.target.y,
              controls.target.z
            );
            return;
          }

          case 'right': {
            camera.position.set(
              camera.position.x + 0.5,
              camera.position.y,
              camera.position.z
            );
            controls.target.set(
              controls.target.x + 0.5,
              controls.target.y,
              controls.target.z
            );
            return;
          }

          case 'bottom': {
            camera.position.set(
              camera.position.x,
              camera.position.y - 0.5,
              camera.position.z
            );
            controls.target.set(
              controls.target.x,
              controls.target.y - 0.5,
              controls.target.z
            );
            return;
          }

          case 'in': {
            if (+camera.position.x <= 2 && +camera.position.x >= -2) {
              camera.position.z /= 1.1;
              camera.position.x /= 1.1;
              camera.position.y /= 1.1;
            } else {
              if (controls.object.rotation.x < -0.09) {
                camera.position.z /= 1.1;
                camera.position.x /= 1.1;
                camera.position.y /= 1.1;
              } else {
                camera.position.z /= 1.1;
              }
            }
            camera.updateMatrixWorld();
            controls.update();
            return;
          }

          case 'out': {
            if (+camera.position.x <= 2 && +camera.position.x >= -2) {
              camera.position.z *= 1.1;
              camera.position.x *= 1.1;
              camera.position.y *= 1.1;
            } else {
              if (controls.object.rotation.x < -0.09) {
                camera.position.z *= 1.1;
                camera.position.x *= 1.1;
                camera.position.y *= 1.1;
              } else {
                camera.position.z *= 1.1;
              }
            }
            camera.updateMatrixWorld();
            controls.update();
            return;
          }
          default: {
            return;
          }
        }
      } else {
        let sceneCam = hall?.sceneTemplate?.data?.camera;
        if (sceneCam) {
          camera.fov = sceneCam.fov;
          sceneCam.position = {
            x: sceneCam.position.x,
            y: sceneCam.position.y,
            z: isMobile ? sceneCam.position.z + 6 : sceneCam.position.z,
          };
          camera.position.set(
            sceneCam.position.x,
            sceneCam.position.y,
            sceneCam.position.z
          );
          controls.target.set(
            sceneCam.orbitTarget.x,
            sceneCam.orbitTarget.y,
            sceneCam.orbitTarget.z
          );
        }
        setHidePan(null);
        setHideZoom(null);
        camera.updateMatrixWorld();
        controls.update();
      }
    }
  };

  const handleChangePage = (page: number) => {
    setPopupId(null);
    setPositionPopup({ top: 0, left: 0 });
    setPage(page);
  };

  const sceneWrapper = useMemo(() => {
    return <SceneWrapper id="bit-scene" ref={sceneRef} />;
  }, []);

  const totalPage = () => {
    if (!hall) return 0;
    return Math.ceil(
      attributes[(hall as any).key].booths.items?.length / pageSize
    );
  };

  return (
    <>
      <SceneContainer>
        <ScenePreview ref={containerRef}>
          {loadedPercent < 100 && (
            <ProgressWrapper>
              <Progress
                size="small"
                strokeColor={theme.colors.primaryColor}
                percent={loadedPercent}
                status="active"
              />
            </ProgressWrapper>
          )}
          {sceneWrapper}
        </ScenePreview>
        {popupId && (
          <BoothPopover
            booth={loadedBooths[popupId]}
            hallId={+hallId}
            top={positionPopup.top}
            left={positionPopup.left}
          />
        )}
        <KeyControls
          hidePan={hidePan}
          hideZoom={hideZoom}
          vectorMove={vectorMove}
        />
        <NavigationButton
          position={0}
          side="left"
          label={t('mainSite.BACK_TO_LOBBY').toUpperCase()}
          onClick={() => history.push('/lobby')}
        />
        {page < totalPage() && (
          <NavigationButton
            position={1}
            side="right"
            label={t('mainSite.NEXT').toUpperCase()}
            onClick={() => handleChangePage(page + 1)}
          />
        )}
        {page > 1 && (
          <NavigationButton
            position={1}
            side="left"
            label={t('mainSite.PREVIOUS').toUpperCase()}
            onClick={() => handleChangePage(page - 1)}
          />
        )}
      </SceneContainer>
      {imageVideoLightbox}
      {videos.map(v => v.html)}
    </>
  );
});

export default Hall;
