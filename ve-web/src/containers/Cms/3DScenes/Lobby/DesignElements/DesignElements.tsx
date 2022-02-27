import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { observer } from 'mobx-react';
import {
  Card,
  Button,
  Row,
  Col,
  Progress,
  message,
  notification,
  Spin,
} from 'antd';
import { useTranslation } from 'react-i18next';
import {
  LeftContent,
  RightContent,
  ScenePreview,
  SceneWrapper,
  ProgressWrapper,
} from '@/components/styles/3DScene';
import { useCmsStores, useCommonStores } from '@/hooks';
import { useHistory } from 'react-router-dom';
import { merge, map, cloneDeep } from 'lodash';
import {
  IAction,
  IAsset,
  IAttribute,
  ILobby,
  IModelItem,
  IPreset,
} from '@/interfaces';
import { configConstants } from '@/constants';
import { sceneHelpers } from '@/helpers';
import StyledHeading from '@/components/styles/StyledHeading';
import ListElements from '@/components/common/ListElements';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import theme from '@/styles/theme';
// Three
import {
  Scene,
  VideoTexture,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  Object3D,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const DesignElements: React.FC = observer(() => {
  const { t } = useTranslation();
  const { authStore } = useCommonStores();
  const { lobbyStore, commonStore } = useCmsStores();
  const history = useHistory();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [lobby, setLobby] = useState<ILobby>();
  const [attributes, setAttributes] = useState<{ [key: string]: IAttribute }>(
    {}
  );
  const [lobbyAttributes, setLobbyAttributes] = useState<{
    [key: string]: IAttribute;
  }>({});
  const [objectAttributes, setObjectAttributes] = useState<{
    [key: string]: IAttribute;
  }>({});
  const [scene, setScene] = useState<Scene>();
  const [loadedPercent, setLoadedPercent] = useState<number>(0);
  const [videos, setVideos] = useState<any[]>([]);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>();
  const [lobbyAssets, setLobbyAssets] = useState<IAsset[]>([]);
  const [lobbyModels, setLobbyModels] = useState<IModelItem[]>([]);
  const [boothTextures, setBoothTextures] = useState<IPreset[]>([]);
  const [lobbyActions, setLobbyActions] = useState<IAction[]>([]);

  const fetchData = async () => {
    const { lobbyId } = authStore.userInfo!.organizer;
    const res = await lobbyStore.getLobby(lobbyId!);
    if (res && !lobbyStore.error) {
      setLobbyAttributes(cloneDeep(res.lobby.attributes));
      const lobby = sceneHelpers.mapAssetsTo3DScene(res.lobby);
      const { attributes, sceneTemplate } = lobby;
      setAttributes(merge({}, sceneTemplate.attributes, attributes));
      setLobby(lobby);
    } else {
      history.push('/cms/dashboard');
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      setScene(undefined);
      setObjectAttributes({});
      setAttributes({});
      setContainerSize(undefined);
      setLobby(undefined);
      setLoadedPercent(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lobbyStore.error) {
      notification.error({
        message: lobbyStore.error,
      });
    }
  }, [lobbyStore.error]);

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

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
    if (!scene) return;
    switch (commonStore.doSetAttributes.assetType) {
      case configConstants.assetTypes.IMAGE:
      case configConstants.assetTypes.VIDEO:
        setLobbyAssets((origin: IAsset[]) => {
          const lobbyAssets = origin.filter(
            asset => asset.key !== commonStore.doSetAttributes.key
          );
          return [...lobbyAssets, commonStore.doSetAttributes as IAsset];
        });
        break;
      case configConstants.assetTypes.TEXTURE_OPTIONS:
        setBoothTextures((origin: IPreset[]) => {
          const boothATextures = origin.filter(
            texture => texture.key !== commonStore.doSetAttributes.key
          );
          return [...boothATextures, commonStore.doSetAttributes as IPreset];
        });
        break;
      case configConstants.assetTypes.ACTION:
        setLobbyActions((origin: IAction[]) => {
          const boothActions = origin.filter(
            action => action.key !== commonStore.doSetAttributes.key
          );
          return [...boothActions, commonStore.doSetAttributes as IAction];
        });
        break;
      case configConstants.assetTypes.GROUP_SCENE:
        setLobbyModels((origin: IModelItem[]) => {
          const lobbyModels = origin.filter(
            model => model.index !== commonStore.doSetAttributes.index
          );
          return [...lobbyModels, commonStore.doSetAttributes as IModelItem];
        });
        break;
    }
    if (
      commonStore.doSetAttributes.assetType !==
      configConstants.assetTypes.ACTION
    ) {
      const object = objectAttributes[commonStore.doSetAttributes.key];
      update3D(commonStore.doSetAttributes, object);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commonStore.doSetAttributes]);

  const update3D = (attrData: any, object: any) => {
    const assetType = attributes[attrData.key]?.assetType;
    sceneHelpers.update3DSceneByKey(
      attrData,
      object,
      videos,
      setVideos,
      assetType,
      objectAttributes[attrData.key]
    );
    if (!objectAttributes[attrData.key] && object) {
      setObjectAttributes((origin: any) => {
        origin[object.name] = object;
        return origin;
      });
    }
  };

  useLayoutEffect(() => {
    if (!scene) return;
    if (!containerSize) return;
    if (!lobby) return;
    if (scene.children.length) return;
    const width = containerSize.width;
    const height = containerSize.height;
    const camera = new PerspectiveCamera(35, width / height, 0.45, 5000);
    const renderer = new WebGLRenderer({ antialias: true });
    const loader = new GLTFLoader();
    const src = `/sceneTemplates/${lobby.sceneTemplate.id}/${lobby.sceneTemplate.path}`;
    loader.load(
      src,
      data => {
        const object = data.scene;
        object.traverse((child: Object3D) => {
          if (['DirectionalLight', 'PointLight'].includes(child.type)) {
            (child as any).intensity = 0.0;
          }
          if (attributes[child.name]) {
            const dataItem = attributes[child.name];
            update3D(dataItem, child);
          }
        });
        scene.add(object);
        const controls = new OrbitControls(camera, renderer.domElement);
        const sceneCam = lobby.sceneTemplate?.data?.camera;
        if (sceneCam) {
          camera.fov = sceneCam.fov;
          camera.position.set(
            sceneCam.position.x,
            sceneCam.position.y,
            sceneCam.position.z + 3
          );
          controls.target.set(
            sceneCam.orbitTarget.x,
            sceneCam.orbitTarget.y,
            sceneCam.orbitTarget.z
          );
        }
        controls.minDistance = 0;
        controls.maxDistance = 85.9602557794006;
        controls.update();
      },
      ({ loaded, total }) => {
        setLoadedPercent(Math.round((loaded / total) * 100));
      }
    );
    const alight = new AmbientLight(0xcccccc, 1.2);
    const directionalLight = new DirectionalLight(0xffffff, 1.6);
    scene.add(alight);
    scene.add(directionalLight);
    renderer.setClearColor('#D8D8D8');
    renderer.setSize(width, height);

    const renderScene = () => {
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
  }, [containerSize, lobby]);

  const save = async () => {
    const attributes = lobbyAttributes || {};
    lobbyActions.forEach(action => {
      attributes[action.key!] = {
        name: action.name,
        action: {
          type: action.type,
          url: action.url,
        },
      } as IAttribute;
    });
    boothTextures.forEach(texture => {
      attributes[texture.key] = {
        name: texture.name,
        value: texture.value,
      } as IAttribute;
    });
    const values = {
      name: lobby?.name,
      status: lobby?.status === 'ACTIVE',
      assets: JSON.stringify(lobbyAssets),
      models: JSON.stringify(lobbyModels),
      attributes: JSON.stringify(attributes),
    };
    const fmData = new FormData();
    map(values, (value: string, key) => {
      fmData.append(key, value);
    });
    const res = await lobbyStore.updateLobby(lobby?.id!, fmData);
    if (res && !lobbyStore.error) {
      setLobbyAssets([]);
      setLobbyModels([]);
      setLobbyActions([]);
      setBoothTextures([]);
      fetchData();
      message.success(t('lobby.UPDATE_LOBBY_SUCCESSFULLY'));
    }
  };

  const sceneWrapper = useMemo(() => {
    return <SceneWrapper id="bit-scene" ref={sceneRef} />;
  }, []);

  return (
    <Card
      title={<StyledHeading>{t('lobby.LOBBY_DESIGN_ELEMENTS')}</StyledHeading>}
      bordered={false}
      extra={
        <Button type="primary" loading={lobbyStore.isLoading} onClick={save}>
          {t('shared.SAVE')}
        </Button>
      }
    >
      {lobby ? (
        <Row style={{ visibility: lobby ? 'visible' : 'hidden' }}>
          <Col xs={24} sm={24} md={24} lg={12} xxl={12}>
            <LeftContent>
              <StyledHeading padding={'0 0 15px 0'}>
                {t('shared.DESIGN_ELEMENTS')}
              </StyledHeading>
              <Spin tip={loadedPercent + '%'} spinning={loadedPercent < 100}>
                <ListElements data={lobby} />
              </Spin>
            </LeftContent>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xxl={12}>
            <RightContent>
              <StyledHeading padding={'0 0 15px 0'}>
                {t('shared.PREVIEW')}
              </StyledHeading>
              <ScenePreview height={'500px'} ref={containerRef}>
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
              {videos.map(v => v.html)}
            </RightContent>
          </Col>
        </Row>
      ) : (
        <LoadingSpinner type={'section'} />
      )}
    </Card>
  );
});

export default DesignElements;
