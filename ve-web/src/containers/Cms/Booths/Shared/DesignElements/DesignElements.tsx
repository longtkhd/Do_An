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
  Select,
  Space,
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
  IBooth,
  IPreset,
  ISceneTemplate,
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

interface BasicsProps {
  boothId: number;
}

const DesignElements: React.FC<BasicsProps> = observer(({ boothId }) => {
  const { t } = useTranslation();
  const { boothStore, commonStore, sceneTemplateStore } = useCmsStores();
  const { authStore } = useCommonStores();
  const history = useHistory();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [booth, setBooth] = useState<IBooth>();
  const [attributes, setAttributes] = useState<{ [key: string]: IAttribute }>(
    {}
  );
  const [boothAttributes, setBoothAttributes] = useState<{
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
  const [boothAssets, setBoothAssets] = useState<IAsset[]>([]);
  const [boothColors, setBoothColors] = useState<IPreset[]>([]);
  const [boothActions, setBoothActions] = useState<IAction[]>([]);
  const [boothTemplate, setBoothTemplate] = useState<ISceneTemplate>();
  const [boothTemplates, setBoothTemplates] = useState<ISceneTemplate[]>([]);

  const fetchData = async () => {
    const res = await boothStore.getBooth(boothId);
    if (res && !boothStore.error) {
      setBoothTemplate(res.booth.sceneTemplate);
      setBoothAttributes(cloneDeep(res.booth.attributes));
      const booth = sceneHelpers.mapAssetsTo3DScene(res.booth);
      const { attributes, sceneTemplate } = booth;
      setAttributes(merge({}, sceneTemplate.attributes, attributes));
      setBooth(booth);
    } else {
      history.push('/cms/dashboard');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await sceneTemplateStore.getSceneTemplates({
        sceneType: configConstants.sceneTypes.BOOTH,
      });
      if (res && !sceneTemplateStore.error) {
        setBoothTemplates(res.sceneTemplates);
      } else {
        history.push('/');
      }
    };
    if (boothId === authStore.userInfo?.organizer.boothId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    return () => {
      setScene(undefined);
      setObjectAttributes({});
      setAttributes({});
      setContainerSize(undefined);
      setBooth(undefined);
      setLoadedPercent(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (boothStore.error) {
      notification.error({
        message: boothStore.error,
      });
    }
  }, [boothStore.error]);

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

  useLayoutEffect(() => {
    if (!scene) return;
    switch (commonStore.doSetAttributes.assetType) {
      case configConstants.assetTypes.IMAGE:
      case configConstants.assetTypes.VIDEO:
        setBoothAssets((origin: IAsset[]) => {
          const boothAssets = origin.filter(
            asset => asset.key !== commonStore.doSetAttributes.key
          );
          return [...boothAssets, commonStore.doSetAttributes as IAsset];
        });
        break;
      case configConstants.assetTypes.COLOR:
        setBoothColors((origin: IPreset[]) => {
          const boothColors = origin.filter(
            color => color.key !== commonStore.doSetAttributes.key
          );
          return [...boothColors, commonStore.doSetAttributes as IPreset];
        });
        break;
      case configConstants.assetTypes.ACTION:
        setBoothActions((origin: IAction[]) => {
          const boothActions = origin.filter(
            action => action.key !== commonStore.doSetAttributes.key
          );
          return [...boothActions, commonStore.doSetAttributes as IAction];
        });
        break;
      default:
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
    if (!booth) return;
    if (scene.children.length) return;
    const width = containerSize.width;
    const height = containerSize.height;
    const camera = new PerspectiveCamera(35, width / height, 0.45, 5000);
    const renderer = new WebGLRenderer({ antialias: true });
    const loader = new GLTFLoader();
    const src = `/sceneTemplates/${booth.sceneTemplate.id}/${booth.sceneTemplate.path}`;
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
        const sceneCam = booth.sceneTemplate?.data?.camera;
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
  }, [containerSize, booth]);

  const save = async () => {
    const attributes = boothAttributes || {};
    boothActions.forEach(action => {
      attributes[action.key!] = {
        name: action.name,
        action: {
          type: action.type,
          url: action.url,
        },
      } as IAttribute;
    });
    boothColors.forEach(color => {
      attributes[color.key] = {
        name: color.name,
        value: color.value,
      } as IAttribute;
    });
    const values = {
      name: booth?.name,
      status: booth?.status === 'ACTIVE',
      assets: JSON.stringify(boothAssets),
      attributes: JSON.stringify(attributes),
      sceneTemplateId: boothTemplate?.id,
    };
    const fmData = new FormData();
    map(values, (value: string, key) => {
      fmData.append(key, value);
    });
    const res = await boothStore.updateBooth(booth?.id!, fmData);
    if (res && !boothStore.error) {
      setBoothAssets([]);
      setBoothColors([]);
      setBoothActions([]);
      fetchData();
      message.success(t('booth.UPDATE_BOOTH_SUCCESSFULLY'));
    }
  };

  const changeBoothTemplate = (boothTemplateId: number) => {
    const sceneTemplate = boothTemplates.find(
      boothTemplate => boothTemplateId === boothTemplate.id
    );
    if (sceneTemplate) {
      setAttributes({});
      setContainerSize(undefined);
      setBoothTemplate(sceneTemplate);
      sceneHelpers.clearScene(scene);
      setObjectAttributes({});
      setLoadedPercent(0);
      setScene(undefined);
      setBoothColors([]);
      const newBooth = sceneHelpers.mapAssetsTo3DScene({
        ...booth,
        sceneTemplate,
        attributes: null,
      });
      const { attributes } = newBooth;
      setAttributes(merge({}, sceneTemplate.attributes, attributes));
      setBooth(newBooth);
    }
  };

  const sceneWrapper = useMemo(() => {
    return <SceneWrapper id="bit-scene" ref={sceneRef} />;
  }, []);

  return (
    <Card
      title={<StyledHeading>{t('booth.BOOTH_DESIGN_ELEMENTS')}</StyledHeading>}
      bordered={false}
      extra={
        <Button type="primary" loading={boothStore.isLoading} onClick={save}>
          {t('shared.SAVE')}
        </Button>
      }
    >
      {booth ? (
        <Row style={{ visibility: booth ? 'visible' : 'hidden' }}>
          <Col xs={24} sm={24} md={24} lg={12} xxl={12}>
            <LeftContent>
              <StyledHeading padding={'0 0 15px 0'}>
                {t('shared.DESIGN_ELEMENTS')}
              </StyledHeading>
              <Spin tip={loadedPercent + '%'} spinning={loadedPercent < 100}>
                <ListElements data={booth} />
              </Spin>
            </LeftContent>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xxl={12}>
            <RightContent>
              <StyledHeading padding={'0 0 15px 0'}>
                {t('shared.PREVIEW')}
              </StyledHeading>
              <ScenePreview height={'500px'} ref={containerRef}>
                <Space direction="vertical" size={10}>
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
                  {boothId === authStore.userInfo?.organizer.boothId && (
                    <Select
                      style={{ width: '100%' }}
                      placeholder={t('validate.PLEASE_SELECT', {
                        field: t('user.BOOTH_TEMPLATE').toLowerCase(),
                      })}
                      defaultValue={boothTemplate?.id}
                      onChange={changeBoothTemplate}
                    >
                      {boothTemplates.map(boothTemplate => (
                        <Select.Option
                          key={boothTemplate.id}
                          value={boothTemplate.id}
                        >
                          {boothTemplate.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Space>
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
