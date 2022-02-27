import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Progress } from 'antd';
import {
  ProgressWrapper,
  SceneWrapper,
  SceneContainer,
  ScenePreview,
} from '@/components/styles/3DScene';
import { useCommonStores, useMainSiteStores } from '@/hooks';
import { IAttribute, IBooth, IHall, IModelItem } from '@/interfaces';
import { useHistory, useParams } from 'react-router-dom';
import { commonHelpers, sceneHelpers } from '@/helpers';
import { merge } from 'lodash';
import KeyControls from '@/components/common/KeyControls';
import theme from '@/styles/theme';
import NavigationButton from '@/components/common/NavigationButton';
import BoothMenu from '@/components/common/BoothMenu';
import DownButton from '@/components/common/DownButton';
import ResourceHubModal from '@/components/common/Modals/ResourceHubModal';
import ReactImageVideoLightbox from '@/components/common/ImageVideoLightbox';
// Three
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  CubeTextureLoader,
  CubeTexture,
  Raycaster,
  VideoTexture,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { configConstants } from '@/constants';

interface ParamTypes {
  id: string;
  hallId: string;
}

let isMove: boolean = true;
let touchCurrent: any;
let camera: PerspectiveCamera;
let controls: OrbitControls;

const Booth: React.FC = observer(() => {
  const { boothStore, hallStore, resourceHubStore } = useMainSiteStores();
  const { chatStore, authStore } = useCommonStores();
  const isMobile = useMediaQuery({
    query: '(max-device-width: 767px)',
  });
  const history = useHistory();
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const { id: boothId, hallId } = useParams<ParamTypes>();
  const [booth, setBooth] = useState<IBooth>();
  const [hall, setHall] = useState<IHall>();
  const [attributes, setAttributes] = useState<{
    [key: string]: IAttribute;
  }>({});
  const [scene, setScene] = useState<Scene>();
  const [loadedPercent, setLoadedPercent] = useState<number>(0);
  const [videos, setVideos] = useState<any[]>([]);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>();
  const [hideZoom, setHideZoom] = useState<string | null>(null);
  const [hidePan, setHidePan] = useState<string | null>(null);
  const [imageVideoLightbox, setImageVideoLightbox] = useState<ReactNode>();
  const [startTrackTime, setStartTrackTime] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await boothStore.getBooth(+boothId);
      if (res && !boothStore.error) {
        if (hallId) {
          const res = await hallStore.getHall(+hallId!);
          if (res && !hallStore.error) {
            const hall = sceneHelpers.mapAssetsTo3DScene(res.hall);
            setHall(hall);
          } else {
            history.push('/');
          }
        }
        const booth = sceneHelpers.mapAssetsTo3DScene(res.booth);
        const { attributes, sceneTemplate } = booth;
        setAttributes(merge({}, sceneTemplate.attributes, attributes));
        setBooth(booth);
      } else {
        history.push('/');
      }
    };
    fetchData();
    return () => {
      setScene(undefined);
      setAttributes({});
      setContainerSize(undefined);
      setBooth(undefined);
      setLoadedPercent(0);
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
          boothId: boothId,
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTrackTime]);

  useEffect(() => {
    const payload = {
      userId: authStore.userInfo?.id,
      boothId: boothId,
      device: commonHelpers.isMobile() ? 'MOBILE' : 'BROWSER',
    };
    chatStore.sendEvent('VISIT', payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!booth) return;
    if (!scene) {
      setScene(new Scene());
    }
    setContainerSize({
      width: containerRef.current?.clientWidth!,
      height: containerRef.current?.clientHeight!,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current, booth]);

  useEffect(() => {
    if (!scene) return;
    if (!containerSize) return;
    if (!booth) return;
    if (scene.children.length) return;
    const width = containerSize.width;
    const height = containerSize.height;
    camera = new PerspectiveCamera(35, width / height, 0.45, 5000);
    const renderer = new WebGLRenderer({ antialias: true });
    const cubeLoader = new CubeTextureLoader()
      .setPath('/cube/pisa/')
      .load(
        ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
        texture => {
          loadBoothScene(camera, texture);
        }
      );

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
        e => raycastHover(e, camera, scene, attributes),
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

    const alight = new AmbientLight(0xffffff, 1);
    scene.add(alight);
    controls = new OrbitControls(camera, renderer.domElement);

    const sceneCam = booth?.sceneTemplate?.data?.camera;
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
    controls.minDistance = 1;
    controls.maxDistance = 15.9602557794006;
    controls.update();
    let initPolar = controls.getPolarAngle();
    controls.maxPolarAngle = initPolar;
    controls.minPolarAngle = initPolar;
    controls.maxAzimuthAngle = Math.PI / 2;
    controls.minAzimuthAngle = -Math.PI / 2;

    renderer.setClearColor('#F2F2F2');
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
      cubeLoader.dispose();
      renderer.renderLists.dispose();
      window.removeEventListener('resize', handleResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sceneRef.current?.removeChild(renderer.domElement);
      sceneHelpers.clearScene(scene);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerSize]);

  const raycast = (
    e: any,
    camera: PerspectiveCamera,
    object: any,
    action: string
  ) => {
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
      if (e.touches && !e.touches[0]) return;
      // update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(object.children, true);
      if (intersects[0]) {
        const o = intersects[0].object;
        objectClick(o);
      }
    }
  };

  const raycastTouch = (
    e: any,
    camera: PerspectiveCamera,
    object: any,
    action: string
  ) => {
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
      raycaster.setFromCamera(mouse, camera);
      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(object.children, true);
      if (intersects[0]) {
        const o = intersects[0].object;
        objectClick(o);
      }
    }
  };

  const raycastHover = (
    e: any,
    camera: PerspectiveCamera,
    object: any,
    attributes: any
  ) => {
    isMove = true;
    sceneHelpers.hoverMouse(
      e,
      containerSize?.width!,
      containerSize?.height!,
      camera,
      object,
      attributes
    );
  };

  const objectClick = (object: any) => {
    document.body.style.cursor = 'default';
    const dataItem = attributes[object.name];
    if (!dataItem) return;
    const type = dataItem?.action?.type;
    chatStore.sendEvent('ADD_CLICK_COLLECTOR', {
      type: object.name,
      name: dataItem.name,
      userId: authStore.userInfo?.id,
      boothId: boothId,
    });
    switch (dataItem.assetType) {
      case configConstants.assetTypes.IMAGE:
      case configConstants.assetTypes.VIDEO:
      case configConstants.assetTypes.TEXT:
        if (!dataItem.action) return;
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
      case configConstants.assetTypes.OBJECT:
      case configConstants.assetTypes.EXTERNAL:
        if (type === configConstants.elementActions.OPEN_RESOURCE) {
          chatStore.sendEvent('ADD_CLICK_COLLECTOR', {
            type: 'resourceHub',
            name: 'Resource Hub Clicked',
            userId: authStore.userInfo?.id,
            boothId: boothId,
          });
          resourceHubStore.setVisibleResourceHubModal(true);
        } else if (type === configConstants.elementActions.OPEN_CHAT) {
          handleStartConversation();
        }
        break;
      default:
        break;
    }
  };

  const loadBoothScene = (camera: PerspectiveCamera, texture: CubeTexture) => {
    if (!scene) return;
    if (!booth) return;
    const loader = new GLTFLoader();
    let hallSrc = '/hall/hallOrganizer/hall.glb';
    let hallSky: any = null;
    if ((booth as any)?.type === 'STANDARD') {
      if (hall?.sceneTemplate?.attributes?.hallbooth) {
        hallSky = {
          presetValue: hall?.sceneTemplate?.attributes?.hallbooth.presetValue,
          value:
            hall?.attributes?.sky?.value ||
            hall?.sceneTemplate?.attributes?.sky?.value,
        };
        hallSrc = hall?.sceneTemplate?.attributes?.hallbooth?.value?.model;
      }
    }
    loader.load(hallSrc, function(data) {
      const object = data.scene;
      if ((booth as any).type === 'INFORMATION') {
        object.position.setY(object.position.y + 0.2);
      } else {
        object.position.setY(object.position.y + 0.5);
      }
      scene.add(object);
      object.traverse((child: any) => {
        if (child.isMesh) {
          child.material.envMap = texture;
          child.material.reflectivity = 0.5;
          child.material.envMapIntensity = 1;
          child.material.needsUpdate = true;
          if (child.name === 'background' && hallSky) {
            sceneHelpers.update3DSceneByKey(
              hallSky,
              child,
              videos,
              setVideos,
              'texture_options'
            );
          }
        }
      });
    });
    const src = `/sceneTemplates/${booth.sceneTemplate.id}/${booth.sceneTemplate.path}`;
    loader.load(
      src,
      data => {
        const object = data.scene;
        if ((booth as any).type === 'INFORMATION') {
          object.position.setY(object.position.y + 0.2);
        } else {
          object.position.setY(object.position.y + 0.5);
        }
        scene.add(object);
        object.traverse((child: any) => {
          if (child.isMesh) {
            child.material.envMap = texture;
            child.material.reflectivity = 0.3;
            child.material.envMapIntensity = 1;
            child.material.needsUpdate = true;
          }

          if (attributes[child.name]) {
            let dataItem = attributes[child.name];
            if (!dataItem.value) return;
            update3D(dataItem, child);
          }
        });
        sceneHelpers.loadExternalModel({
          scene,
          attributes,
          pos:
            (booth as any).type === 'INFORMATION' ? [0, 0.2, 0] : [0, 0.5, 0],
        });
      },
      ({ loaded, total }) => {
        setLoadedPercent(Math.round((loaded / total) * 100));
      }
    );
  };

  const update3D = (attrData: any, object: any) => {
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
      video.ref.current.play();
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
        if (camera.position.x < -14) {
          setHidePan('left');
          if (direction === 'left') {
            direction = null;
          }
        } else if (camera.position.x > 14) {
          setHidePan('right');
          if (direction === 'right') {
            direction = null;
          }
        } else if (!hidePan) {
          setHidePan(null);
        }

        if (camera.position.z < 1) {
          setHideZoom('in');
        } else if (camera.position.z > 14) {
          setHideZoom('out');
        } else if (!hideZoom) {
          setHideZoom(null);
        }

        switch (direction) {
          case 'left': {
            camera.position.set(
              camera.position.x - 0.2,
              camera.position.y,
              camera.position.z
            );
            controls.target.set(
              controls.target.x - 0.2,
              controls.target.y,
              controls.target.z
            );
            return;
          }

          case 'right': {
            camera.position.set(
              camera.position.x + 0.2,
              camera.position.y,
              camera.position.z
            );
            controls.target.set(
              controls.target.x + 0.2,
              controls.target.y,
              controls.target.z
            );
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
        let sceneCam = booth?.sceneTemplate?.data?.camera;
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

  const listBooths = () => {
    return hall
      ? hall.attributes?.booths.items.filter((item: IModelItem) => !!item)
      : [];
  };

  const currentBoothIndex = () => {
    return listBooths()?.findIndex(b => b?.value?.id === +boothId);
  };

  const handleNext = () => {
    if (currentBoothIndex()! < listBooths()?.length! - 1) {
      const id = listBooths()![currentBoothIndex()! + 1]?.value?.id;
      history.push(`/hall/${hallId}/booth/${id}`);
    }
  };

  const handlePrevious = () => {
    if (currentBoothIndex()! > 0) {
      const id = listBooths()![currentBoothIndex()! - 1]?.value?.id;
      history.push(`/hall/${hallId}/booth/${id}`);
    }
  };

  const sceneWrapper = useMemo(() => {
    return <SceneWrapper id="bit-scene" ref={sceneRef} />;
  }, []);

  const isInfoDesk = () => {
    return (booth as any)?.type === 'INFORMATION';
  };

  const handleStartConversation = () => {
    const payload = { boothId, userId: authStore.userInfo?.id };
    chatStore.sendEvent('START_CONVERSATION', payload);
    chatStore.sendEvent('ADD_CLICK_COLLECTOR', {
      type: 'chatWithUs',
      name: 'Live Chat Clicked',
      userId: authStore.userInfo?.id,
      boothId: boothId,
    });
  };

  useEffect(() => {
    chatStore.listenEvent('START_CONVERSATION', (data: any) => {
      const { conversation } = data;
      chatStore.setCurrentConversation(conversation);
      if (!chatStore.conversations.find(conv => conv.id === conversation.id)) {
        chatStore.setConversations([conversation, ...chatStore.conversations]);
      }
      chatStore.setVisibleInboxModal(true);
    });
    return () => {
      chatStore.stopEvent('START_CONVERSATION');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SceneContainer overflow={isInfoDesk() ? 'hidden' : 'auto'}>
        <ScenePreview
          height={
            isInfoDesk()
              ? '100%'
              : isMobile
              ? `calc(100% - 160px)`
              : `calc(100% - 72px)`
          }
          ref={containerRef}
        >
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
            {!isInfoDesk() && (
              <DownButton
                top={isMobile ? 'calc(100vh - 240px)' : 'calc(100vh - 150px)'}
                scrollRef={scrollRef}
              />
            )}
            <div ref={scrollRef}></div>
            <BoothMenu
              booth={booth!}
              startConversation={handleStartConversation}
              scrollRef={scrollRef}
            />
            <KeyControls
              hidePan={hidePan}
              hideZoom={hideZoom}
              vectorMove={vectorMove}
            />
          </>
        )}
        {hallId ? (
          <>
            <NavigationButton
              position={0}
              side="left"
              label={t('mainSite.BACK_TO_HALL').toUpperCase()}
              onClick={() => history.push(`/hall/${hallId}`)}
            />
            {currentBoothIndex()! < listBooths()?.length! - 1 && (
              <NavigationButton
                position={1}
                side="right"
                label={t('mainSite.NEXT_BOOTH').toUpperCase()}
                onClick={() => handleNext()}
              />
            )}
            {currentBoothIndex()! > 0 && (
              <NavigationButton
                position={1}
                side="left"
                label={t('mainSite.PREVIOUS_BOOTH').toUpperCase()}
                onClick={() => handlePrevious()}
              />
            )}
          </>
        ) : (
          <NavigationButton
            position={0}
            side="left"
            label={t('mainSite.BACK_TO_LOBBY').toUpperCase()}
            onClick={() => history.push('/lobby')}
          />
        )}
        <ResourceHubModal boothId={+boothId} />
      </SceneContainer>
      {imageVideoLightbox}
      {videos.map(v => v.html)}
    </>
  );
});

export default Booth;
