import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Progress } from 'antd';
import {
  ProgressWrapper,
  SceneWrapper,
  SceneContainer,
  ScenePreview,
  NavigationMobileContainer,
  NavigationMobileIcon,
  NavigationMobileTitle,
  NavigationMobileButton,
} from '@/components/styles/3DScene';
import { useMainSiteStores } from '@/hooks';
import { IAttribute, ILobby, ModelType, IModelItem } from '@/interfaces';
import { useHistory } from 'react-router-dom';
import { commonHelpers, sceneHelpers } from '@/helpers';
import { merge, map } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import WelcomeModal from '@/components/common/Modals/WelcomeModal';
import KeyControls from '@/components/common/KeyControls';
import theme from '@/styles/theme';
import ReactImageVideoLightbox from '@/components/common/ImageVideoLightbox';
import SVGIcon from '@/components/common/SVGIcon';
// Three
import {
  Scene,
  Cache,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  CubeTextureLoader,
  CubeTexture,
  Group,
  Clock,
  Raycaster,
  VideoTexture,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { configConstants } from '@/constants';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as BoothIcon } from '@/assets/icons/booth.svg';

const currentDataBoothInfo: any = [];
const mixers: any = [];
let isMove: boolean = true;
let touchCurrent: any;
let camera: PerspectiveCamera;
let controls: OrbitControls;

const Lobby: React.FC = observer(() => {
  const { lobbyStore, boothStore, commonStore } = useMainSiteStores();
  const isMobile = useMediaQuery({
    query: '(max-device-width: 767px)',
  });
  const history = useHistory();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [lobby, setLobby] = useState<ILobby>();
  const [attributes, setAttributes] = useState<{
    [key: string]: { [key: string]: IAttribute };
  }>({});
  const [scene, setScene] = useState<Scene>();
  const [loadedPercent, setLoadedPercent] = useState<number>(0);
  const [videos, setVideos] = useState<any[]>([]);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>();
  const [welcomeModal, setWelcomeModal] = useState<ReactNode>();
  const [imageVideoLightbox, setImageVideoLightbox] = useState<ReactNode>();
  const [hideZoom, setHideZoom] = useState<string | null>(null);
  const [hidePan, setHidePan] = useState<string | null>(null);

  useEffect(() => {
    const isShowWelcomeMsg = sessionStorage.getItem('isShowWelcomeMsg');
    if (isShowWelcomeMsg !== 'true') {
      setWelcomeModal(<WelcomeModal onCancel={() => setWelcomeModal(<></>)} />);
      sessionStorage.setItem('isShowWelcomeMsg', 'true');
    }
  }, []);

  const extractAttributes = (model: ModelType) => {
    const { sceneTemplate } = model;
    const attributes = merge({}, sceneTemplate.attributes, model.attributes);
    attributes.subAttributes = getSubAttributes(attributes);
    model.key = uuidv4();
    setAttributes(origin => {
      origin[model.key!] = attributes;
      return origin;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const lobbyId = commonStore.lobby?.id;
      const res = await lobbyStore.getLobby(lobbyId!);
      if (res && !lobbyStore.error) {
        const lobby = sceneHelpers.mapAssetsTo3DScene(res.lobby);
        extractAttributes(lobby);
        setLobby(lobby);
      } else {
        history.push('/');
      }
    };
    fetchData();
    return () => {
      setScene(undefined);
      setAttributes({});
      setContainerSize(undefined);
      setLobby(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!lobby) return;
    if (!scene) {
      setScene(new Scene());
    }
    setContainerSize({
      width: containerRef.current?.clientWidth!,
      height: containerRef.current?.clientHeight!,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current, lobby]);

  useEffect(() => {
    if (!scene) return;
    if (!containerSize) return;
    if (!lobby) return;
    if (scene.children.length) return;
    const width = containerSize.width;
    const height = containerSize.height;
    Cache.enabled = false;
    camera = new PerspectiveCamera(35, width / height, 0.45, 20000);
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    const cubeLoader = new CubeTextureLoader()
      .setPath('/cube/pisa/')
      .load(
        ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
        texture => {
          loadLobbyScene(camera, texture);
        }
      );
    const alight = new AmbientLight(0xeeeeee, 1);
    scene.add(alight);
    controls = new OrbitControls(camera, renderer.domElement);
    const sceneCam = lobby.sceneTemplate?.data?.camera;
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
    const clock = new Clock();

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
      const delta = clock.getDelta();
      mixers.forEach((mixer: any) => {
        mixer.a.update(delta);
        if (!mixer.c) return;
        if (mixer.c.x) {
          if (mixer.o.position.x > mixer.c.x[1]) {
            mixer.o.rotation.y = -mixer.c.r.y;
          }
          if (mixer.o.position.x < mixer.c.x[0]) {
            mixer.o.rotation.y = mixer.c.r.y;
          }
          if (mixer.o.rotation.y === mixer.c.r.y) {
            mixer.o.position.x += mixer.c.x[2];
          } else mixer.o.position.x -= mixer.c.x[2];
        }
      });
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
      cubeLoader.dispose();
      renderer.renderLists.dispose();
      window.removeEventListener('resize', handleResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sceneRef.current?.removeChild(renderer.domElement);
      sceneHelpers.clearScene(scene);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerSize]);

  const loadLobbyScene = (camera: PerspectiveCamera, texture: CubeTexture) => {
    if (!scene) return;
    if (!lobby) return;
    const loader = new GLTFLoader();
    const src = `/sceneTemplates/${lobby.sceneTemplate.id}/${lobby.sceneTemplate.path}`;
    loader.load(
      src,
      data => {
        const object = data.scene;
        scene.add(object);
        const intensity = lobby.sceneTemplate.data?.env?.lobbyIntensity ?? 1;
        sceneHelpers.loadExternalModel({
          scene,
          attributes: attributes[(lobby as any).key],
          pos: [0, 0, 0],
          mixers,
        });
        traverseScene((lobby as any).key, object, texture, intensity);

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

          if (action === 'down') {
            isMove = false;
          }
          if (action === 'up' && !isMove) {
            raycaster.setFromCamera(mouse, camera);
            // calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects(
              object.children,
              true
            );
            if (intersects[0]) {
              const o = intersects[0].object;
              objectClick((lobby as any).key, o);
            }
          }
        }

        function raycastTouch(
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
              objectClick((lobby as any).key, o);
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
            e =>
              raycastHover(e, camera, object, attributes, (lobby as any).key),
            false
          );
          containerRef.current.addEventListener(
            'touchstart',
            e => raycastTouch(e, camera, scene, 'down'),
            false
          );
          containerRef.current.addEventListener(
            'touchend',
            e => raycastTouch(e, camera, scene, 'up'),
            false
          );
        }
        loadBooths(attributes[(lobby as any).key].booths.items, camera);
      },
      ({ loaded, total }) => {
        setLoadedPercent(Math.round(((loaded * 0.5) / total) * 100));
      }
    );
  };

  const objectClick = (modelKey: string, object: any) => {
    document.body.style.cursor = 'default';
    let dataItem =
      attributes[modelKey][object.name] ||
      (attributes[modelKey] as any)?.subAttributes[object.name];
    if (!dataItem) return;
    if (dataItem.key === 'mainstage_door') {
      dataItem = (attributes[modelKey] as any)?.subAttributes[object.name];
    }
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
      case configConstants.modelTypes.HALL:
        history.push(`/hall/${dataItem.value.id}`);
        break;
      case configConstants.modelTypes.STAGE:
        history.push(`/mainstage/${dataItem.value.id}`);
        break;
      default:
        break;
    }
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
  };

  const loadBooths = (booths: IModelItem[], camera: PerspectiveCamera) => {
    if (!scene) return;
    const loader = new GLTFLoader();
    booths.forEach(async item => {
      const res = await boothStore.getBooth(item.value?.id!);
      if (res?.booth) {
        const booth = sceneHelpers.mapAssetsTo3DScene(res.booth);
        if (!booth) return;
        extractAttributes(booth);
        const src = `/sceneTemplates/${booth.sceneTemplate.id}/${booth.sceneTemplate.path}`;
        loader.load(src, data => {
          const object = data.scene;
          currentDataBoothInfo.push({ object, id: item.value?.id! });
          traverseScene(booth.key!, object, null, 0);
          scene.add(object);
          object.position.setX(item.pos[0]);
          object.position.setY(item.pos[1]);
          object.position.setZ(item.pos[2]);

          sceneHelpers.loadExternalModel({
            scene,
            attributes: attributes[booth.key],
            pos: item.pos,
            setLoadedPercent: setLoadedPercent,
            percentAdd: 50 / booths.length,
          });

          function raycast(
            e: any,
            camera: PerspectiveCamera,
            object: any,
            item: IModelItem,
            action: string
          ) {
            const raycaster = new Raycaster();
            const mouse: any = {};
            if (e.changedTouches) {
              mouse.x =
                2 * (e.changedTouches[0].clientX / containerSize?.width!) - 1;
              mouse.y =
                1 -
                2 *
                  ((e.changedTouches[0].clientY - 70) / containerSize?.height!);
            } else {
              mouse.x = 2 * (e.clientX / containerSize?.width!) - 1;
              mouse.y = 1 - 2 * ((e.clientY - 70) / containerSize?.height!);
            }
            if (action === 'down') {
              isMove = false;
            }
            if (action === 'up' && !isMove) {
              // update the picking ray with the camera and mouse position
              raycaster.setFromCamera(mouse, camera);
              // calculate objects intersecting the picking ray
              const intersects = raycaster.intersectObjects(
                object.children,
                true
              );
              if (intersects[0]) {
                history.push(`/booth/${item.value?.id!}`);
              }
            }
          }

          function raycastTouch(
            e: any,
            camera: PerspectiveCamera,
            object: any,
            item: IModelItem,
            action: string
          ) {
            const raycaster = new Raycaster();
            const mouse: any = {};
            if (e.changedTouches) {
              mouse.x =
                2 * (e.changedTouches[0].clientX / containerSize?.width!) - 1;
              mouse.y =
                1 -
                2 *
                  ((e.changedTouches[0].clientY - 70) / containerSize?.height!);
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
                history.push(`/booth/${item.value?.id!}`);
              }
            }
          }

          if (containerRef.current && attributes) {
            containerRef.current.addEventListener(
              'mousedown',
              e => raycast(e, camera, object, item, 'down'),
              false
            );
            containerRef.current.addEventListener(
              'mouseup',
              e => raycast(e, camera, object, item, 'up'),
              false
            );
            containerRef.current.addEventListener('mousemove', e =>
              raycastHoverEnter(e)
            );
            containerRef.current.addEventListener(
              'touchstart',
              e => raycastTouch(e, camera, object, item, 'down'),
              false
            );
            containerRef.current.addEventListener(
              'touchend',
              e => raycastTouch(e, camera, object, item, 'up'),
              false
            );
          }
        });
      }
    });
  };

  const raycastHoverEnter = (e: any) => {
    isMove = true;
    const mouse: any = {};
    mouse.x = 2 * (e.clientX / containerSize?.width!) - 1;
    mouse.y = 1 - 2 * ((e.clientY - 70) / containerSize?.height!);
    const raycaster = new Raycaster();
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    // calculate objects intersecting the picking ray
    currentDataBoothInfo.forEach((booth: any) => {
      const intersects = raycaster.intersectObjects(
        booth.object.children,
        true
      );
      if (intersects[0]) {
        document.body.style.cursor = 'pointer';
      }
    });
  };

  const traverseScene = (
    modelKey: string,
    object: Group,
    texture: CubeTexture | null,
    intensity: number
  ) => {
    object.traverse((child: any) => {
      if (child.isMesh && child.material && texture) {
        child.material.envMap = texture;
        child.material.reflectivity = 0.3;
        child.material.envMapIntensity = intensity;
        child.material.needsUpdate = true;
      }
      if (attributes[modelKey][child.name]) {
        const dataItem = attributes[modelKey][child.name];
        if (!dataItem?.value) return;
        update3D(modelKey, dataItem, child);
      } else {
        if (!(attributes[modelKey] as any)?.subAttributes[child.name]) return;
        const dataItem = (attributes[modelKey] as any).subAttributes[
          child.name
        ];
        update3D(modelKey, dataItem, child);
      }
    });
  };

  const update3D = (modelKey: string, attrData: any, object: any) => {
    const assetType =
      attrData?.assetType ||
      (attributes[modelKey] as any)?.subAttributes[attrData.key]?.assetType;
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
      video.ref.current?.play();
      const texture = new VideoTexture(video.ref.current);
      video.object.material.map = texture;
      video.object.material.map.wrapS = 1000;
      video.object.material.map.wrapT = 1000;
      video.object.material.map.flipY = false;
    });
  }, [videos]);

  const getSubAttributes = (attributes: { [key: string]: IAttribute }) => {
    const subAttributes: any = {};
    map(attributes, (attrData, key) => {
      if (attrData.assetType === configConstants.assetTypes.GROUP_SCENE) {
        attrData.items.forEach(item => {
          if (item) {
            (item as any).parentId = key;
            item.assetType = attrData.model;
            switch (attrData.model) {
              case configConstants.modelTypes.HALL:
                subAttributes[item.key] = item;
                subAttributes[`${item.key}_text`] = {
                  assetType: 'text',
                  key: `${item.key}_text`,
                  value: item.value,
                  model: attrData.model,
                  action: {
                    type: 'uri',
                    data: {
                      link: '/hall/' + item.value?.id,
                    },
                  },
                };
                break;
              case configConstants.modelTypes.STAGE:
                subAttributes[item.key] = item;
                subAttributes[`${item.key}_text`] = {
                  assetType: 'text',
                  key: `${item.key}_text`,
                  value: item.value,
                  model: attrData.model,
                  action: {
                    type: 'uri',
                    data: {
                      link: '/mainstage/' + item.value?.id,
                    },
                  },
                };
                break;
              default:
                break;
            }
          }
        });
      }
    });
    return subAttributes;
  };

  const vectorMove = (direction: string | null) => {
    if (direction && controls && camera) {
      if (direction !== 'default') {
        if (camera.position.x < -15) {
          setHidePan('left');
          if (direction === 'left') {
            direction = null;
          }
        } else if (camera.position.x > 15) {
          setHidePan('right');
          if (direction === 'right') {
            direction = null;
          }
        } else if (!hidePan) {
          setHidePan(null);
        }

        if (camera.position.z < 18) {
          setHideZoom('in');
        } else if (camera.position.z > 38) {
          setHideZoom('out');
        } else if (!hideZoom) {
          setHideZoom(null);
        }

        switch (direction) {
          case 'left': {
            camera.position.set(
              camera.position.x - 0.3,
              camera.position.y,
              camera.position.z
            );
            controls.target.set(
              controls.target.x - 0.3,
              controls.target.y,
              controls.target.z
            );
            camera.updateMatrixWorld();
            controls.update();
            return;
          }

          case 'right': {
            camera.position.set(
              camera.position.x + 0.3,
              camera.position.y,
              camera.position.z
            );
            controls.target.set(
              controls.target.x + 0.3,
              controls.target.y,
              controls.target.z
            );
            camera.updateMatrixWorld();
            controls.update();
            return;
          }

          case 'in': {
            if (+camera.position.x <= 2 && +camera.position.x >= -2) {
              camera.position.z /= 1.05;
              camera.position.x /= 1.05;
              camera.position.y /= 1.05;
            } else {
              if (controls.object.rotation.x < -0.09) {
                camera.position.z /= 1.05;
                camera.position.x /= 1.05;
                camera.position.y /= 1.05;
              } else {
                camera.position.z /= 1.05;
              }
            }
            camera.updateMatrixWorld();
            controls.update();
            return;
          }

          case 'out': {
            if (+camera.position.x <= 2 && +camera.position.x >= -2) {
              camera.position.z *= 1.05;
              camera.position.x *= 1.05;
              camera.position.y *= 1.05;
            } else {
              if (controls.object.rotation.x < -0.09) {
                camera.position.z *= 1.05;
                camera.position.x *= 1.05;
                camera.position.y *= 1.05;
              } else {
                camera.position.z *= 1.05;
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
        const sceneCam = lobby?.sceneTemplate?.data?.camera;
        if (sceneCam) {
          camera.fov = sceneCam.fov;
          sceneCam.position = {
            x: sceneCam.position.x,
            y: sceneCam.position.y,
            z: isMobile ? sceneCam.position.z + 2 : sceneCam.position.z,
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

  const sceneWrapper = useMemo(() => {
    return <SceneWrapper id="bit-scene" ref={sceneRef} />;
  }, []);

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
        {scene?.children && (
          <>
            <KeyControls
              hidePan={hidePan}
              hideZoom={hideZoom}
              vectorMove={vectorMove}
            />
            {isMobile && (
              <NavigationMobileContainer>
                <NavigationMobileButton
                  onClick={() =>
                    history.push(`/booth/${commonStore.organizer?.infoDeskId}`)
                  }
                  width={'50%'}
                >
                  <NavigationMobileIcon>
                    <SVGIcon
                      width={20}
                      height={20}
                      content={<BoothIcon />}
                    ></SVGIcon>
                  </NavigationMobileIcon>
                  <NavigationMobileTitle>
                    {commonStore.lobby?.infoBoothButton}
                  </NavigationMobileTitle>
                </NavigationMobileButton>
                <NavigationMobileButton
                  onClick={() =>
                    history.push(`/booth/${commonStore.organizer?.boothId}`)
                  }
                  width={'50%'}
                >
                  <NavigationMobileIcon>
                    <SVGIcon
                      width={20}
                      height={20}
                      content={<BoothIcon />}
                    ></SVGIcon>
                  </NavigationMobileIcon>
                  <NavigationMobileTitle>
                    {commonStore.lobby?.organizerBoothButton}
                  </NavigationMobileTitle>
                </NavigationMobileButton>
              </NavigationMobileContainer>
            )}
          </>
        )}
      </SceneContainer>
      {welcomeModal}
      {imageVideoLightbox}
      {videos.map(v => v.html)}
    </>
  );
});

export default Lobby;
