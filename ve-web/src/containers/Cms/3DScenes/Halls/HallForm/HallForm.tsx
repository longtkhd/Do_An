import {
  IAction,
  IAsset,
  IAttribute,
  IHall,
  IModelItem,
  IPreset,
  ISceneTemplate,
} from '@/interfaces';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Progress,
  Space,
  Select,
  notification,
  Spin,
} from 'antd';
import {
  LeftContent,
  RightContent,
  ScenePreview,
  SceneWrapper,
  ProgressWrapper,
} from '@/components/styles/3DScene';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { merge, map, cloneDeep } from 'lodash';
import { configConstants } from '@/constants';
import { sceneHelpers } from '@/helpers';
import ListElements from '@/components/common/ListElements';
import StyledHeading from '@/components/styles/StyledHeading';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import UploadImageCrop from '@/components/common/UploadImageCrop';
import theme from '@/styles/theme';
// Three
import {
  Scene,
  VideoTexture,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  Object3D,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useCmsStores } from '@/hooks';
import { observer } from 'mobx-react';

interface HallFormProps {
  hall: IHall | undefined;
  onSave: (data: FormData) => void;
  mode?: 'CREATE' | 'EDIT';
}

const boothNumbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const HallForm: React.FC<HallFormProps> = observer(
  ({ mode, onSave, ...rest }) => {
    const history = useHistory();
    const { t } = useTranslation();
    const { commonStore, hallStore, sceneTemplateStore } = useCmsStores();
    const [form] = Form.useForm();
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const [hall, setHall] = useState<IHall>();
    const [attributes, setAttributes] = useState<{ [key: string]: IAttribute }>(
      {}
    );
    const [hallAttributes, setHallAttributes] = useState<{
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
    const [fileList, setFileList] = useState<any>([]);
    const [hallAssets, setHallAssets] = useState<IAsset[]>([]);
    const [hallModels, setHallModels] = useState<IModelItem[]>([]);
    const [hallTextures, setHallTextures] = useState<IPreset[]>([]);
    const [hallActions, setHallActions] = useState<IAction[]>([]);
    const [hallTemplate, setHallTemplate] = useState<ISceneTemplate>();
    const [hallTemplates, setHallTemplates] = useState<ISceneTemplate[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const res = await sceneTemplateStore.getSceneTemplates({
          sceneType: configConstants.sceneTypes.HALL,
        });
        if (res && !sceneTemplateStore.error) {
          setHallTemplates(res.sceneTemplates);
          if (!rest.hall!.sceneTemplate) {
            rest.hall!.sceneTemplate = res.sceneTemplates[0];
            rest.hall!.sceneTemplateId = res.sceneTemplates[0].id;
          }
          setHallTemplate(rest.hall!.sceneTemplate);
          setHallAttributes(cloneDeep(rest.hall?.attributes!));
          const hall = sceneHelpers.mapAssetsTo3DScene(rest.hall);
          const { attributes, sceneTemplate } = rest.hall!;
          setAttributes(merge({}, sceneTemplate.attributes, attributes));
          setHall(hall);
          const { avatar, name, id } = hall!;
          form.setFieldsValue({
            boothNumber:
              attributes?.booths?.boothNumber ||
              sceneTemplate?.attributes?.booths?.boothNumber,
            avatar,
            name,
          });
          if (avatar) {
            setFileList([
              {
                url: `${configConstants.ASSETS_URL}/halls/${id}/${avatar}`,
              },
            ]);
          }
        } else {
          history.push('/');
        }
      };

      if (rest.hall) {
        fetchData();
      }
      return () => {
        setScene(undefined);
        setObjectAttributes({});
        setAttributes({});
        setContainerSize(undefined);
        setHall(undefined);
        setLoadedPercent(0);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rest.hall]);

    useEffect(() => {
      if (hallStore.error) {
        notification.error({
          message: hallStore.error,
        });
      }
    }, [hallStore.error]);

    useEffect(() => {
      videos.forEach(video => {
        video.ref.current.play();
        video.ref.current.setAttribute('playsinline', 'playsinline');
        const texture = new VideoTexture(video.ref.current);
        video.object.material.map = texture;
        video.object.material.map.wrapS = 1000;
        video.object.material.map.wrapT = 1000;
        video.object.material.map.flipY = false;
      });
    }, [videos]);

    useLayoutEffect(() => {
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
      switch (commonStore.doSetAttributes.assetType) {
        case configConstants.assetTypes.IMAGE:
        case configConstants.assetTypes.VIDEO:
          setHallAssets((origin: IAsset[]) => {
            const lobbyAssets = origin.filter(
              asset => asset.key !== commonStore.doSetAttributes.key
            );
            return [...lobbyAssets, commonStore.doSetAttributes as IAsset];
          });
          break;
        case configConstants.assetTypes.TEXTURE_OPTIONS:
          setHallTextures((origin: IPreset[]) => {
            const boothATextures = origin.filter(
              texture => texture.key !== commonStore.doSetAttributes.key
            );
            return [...boothATextures, commonStore.doSetAttributes as IPreset];
          });
          break;
        case configConstants.assetTypes.ACTION:
          setHallActions((origin: IAction[]) => {
            const boothActions = origin.filter(
              action => action.key !== commonStore.doSetAttributes.key
            );
            return [...boothActions, commonStore.doSetAttributes as IAction];
          });
          break;
        case configConstants.assetTypes.GROUP_SCENE:
          setHallModels((origin: IModelItem[]) => {
            const hallModels = origin.filter(
              model => model.index !== commonStore.doSetAttributes.index
            );
            return [...hallModels, commonStore.doSetAttributes as IModelItem];
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

    useLayoutEffect(() => {
      if (!scene) return;
      if (!containerSize) return;
      if (!hall) return;
      if (scene.children.length) return;
      const width = containerSize.width;
      const height = containerSize.height;
      const camera = new PerspectiveCamera(35, width / height, 0.45, 5000);
      const renderer = new WebGLRenderer({ antialias: true });
      const loader = new GLTFLoader();
      const src = `/sceneTemplates/${hall.sceneTemplate.id}/${hall.sceneTemplate.path}`;
      loader.load(
        src,
        data => {
          const object = data.scene;
          object.traverse((child: Object3D) => {
            if (attributes[child.name]) {
              const dataItem = attributes[child.name];
              update3D(dataItem, child);
            }
          });
          scene.add(object);
          const controls = new OrbitControls(camera, renderer.domElement);
          const sceneCam = hall.sceneTemplate?.data?.camera;
          if (sceneCam) {
            camera.fov = sceneCam.fov;
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
          controls.minDistance = 0;
          controls.maxDistance = 110.9602557794006;
          controls.update();
        },
        ({ loaded, total }) => {
          setLoadedPercent(Math.round((loaded / total) * 100));
        }
      );
      const alight = new AmbientLight(0xcccccc, 1.5);
      scene.add(alight);
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
    }, [containerSize, hall]);

    const onChangeBoothNumber = (boothNumber: number) => {
      setHallModels((origin: IModelItem[]) => {
        return origin.filter(model => model.index < boothNumber);
      });
      setHallAttribute('booths', { boothNumber } as IAttribute);
    };

    const setHallAttribute = (key: string, data: IAttribute) => {
      const attributes = hall?.attributes;
      hallAssets.forEach(asset => {
        attributes![asset.key!] = asset as IAttribute;
      });
      hallTextures.forEach(texture => {
        attributes![texture.key] = {
          key: texture.key,
          name: texture.name,
          value: texture.value,
        } as IAttribute;
      });
      attributes![key] = data;
      setHall({
        ...hall!,
        attributes,
      });
      setObjectAttributes({});
      setAttributes(merge({}, hall?.sceneTemplate.attributes, attributes));
    };

    const save = () => {
      form
        .validateFields()
        .then(values => {
          const { boothNumber } = values;
          const attributes = hallAttributes || {};
          hallActions.forEach(action => {
            attributes[action.key!] = {
              name: action.name,
              action: {
                type: action.type,
                url: action.url,
              },
            } as IAttribute;
          });
          hallTextures.forEach(texture => {
            attributes[texture.key] = {
              name: texture.name,
              value: texture.value,
            } as IAttribute;
          });
          values = {
            ...values,
            boothNumber,
            status: hall?.status === 'ACTIVE',
            assets: JSON.stringify(hallAssets),
            models: JSON.stringify(hallModels),
            sceneTemplateId: hallTemplate?.id,
            attributes: JSON.stringify({
              ...attributes,
              booths: {
                boothNumber,
              },
            }),
          };
          const fmData = new FormData();
          map(values, (value, key) => {
            if (key === 'avatar' && fileList.length && value !== hall?.avatar) {
              const file = fileList[0];
              fmData.append(key, file, file.name);
            } else {
              fmData.append(key, value);
            }
          });
          onSave(fmData);
        })
        .catch(() => {});
    };

    const changeHallTemplate = (hallTemplateId: number) => {
      const sceneTemplate = hallTemplates.find(
        hallTemplate => hallTemplateId === hallTemplate.id
      );
      if (sceneTemplate) {
        setAttributes({});
        setContainerSize(undefined);
        setHallTemplate(sceneTemplate);
        sceneHelpers.clearScene(scene);
        setObjectAttributes({});
        setLoadedPercent(0);
        setScene(undefined);
        const newBooth = sceneHelpers.mapAssetsTo3DScene({
          ...hall,
          sceneTemplate,
          attributes: null,
        });
        const { attributes } = newBooth;
        setAttributes(merge({}, sceneTemplate.attributes, attributes));
        setHall(newBooth);
      }
    };

    const sceneWrapper = useMemo(() => {
      return <SceneWrapper id="bit-scene" ref={sceneRef} />;
    }, []);

    return (
      <Card
        title={
          <StyledHeading>
            {mode === 'CREATE' ? t('hall.CREATE_HALL') : t('hall.UPDATE_HALL')}
          </StyledHeading>
        }
        extra={
          <Space>
            <Button>
              <Link to="/cms/pages/halls">
                <ArrowLeftOutlined /> {t('shared.BACK')}
              </Link>
            </Button>
            <Button loading={hallStore.isLoading} onClick={save} type="primary">
              {t('shared.SAVE')}
            </Button>
          </Space>
        }
      >
        {hall ? (
          <Row>
            <Col xs={24} sm={24} md={24} lg={12} xxl={12}>
              <LeftContent>
                <StyledHeading padding={'0 0 15px 0'}>
                  {t('shared.DESIGN_ELEMENTS')}
                </StyledHeading>
                <Form form={form} layout="vertical">
                  <Form.Item
                    label={t('hall.AVATAR')}
                    name="avatar"
                    rules={[
                      {
                        required: true,
                        message: t('validate.PLEASE_UPLOAD', {
                          field: t('hall.AVATAR').toLowerCase(),
                        }),
                      },
                    ]}
                  >
                    <UploadImageCrop
                      fileList={fileList}
                      onChangeFile={setFileList}
                      width={250}
                      height={250}
                      shape="round"
                    />
                  </Form.Item>
                  <Form.Item
                    label={t('hall.HALL_NAME')}
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: t('validate.PLEASE_INPUT', {
                          field: t('hall.HALL_NAME').toLowerCase(),
                        }),
                      },
                    ]}
                  >
                    <Input placeholder={t('hall.HALL_NAME')} />
                  </Form.Item>
                  <Form.Item
                    label={t('hall.MAXIMUM_BOOTHS')}
                    name="boothNumber"
                    rules={[
                      {
                        required: true,
                        message: t('validate.PLEASE_SELECT', {
                          field: t('hall.MAXIMUM_BOOTHS').toLowerCase(),
                        }),
                      },
                    ]}
                  >
                    <Select onChange={onChangeBoothNumber}>
                      {boothNumbers.map(item => (
                        <Select.Option key={item} value={item}>
                          {item} {t('hall.BOOTHS')}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form>
                <Spin tip={loadedPercent + '%'} spinning={loadedPercent < 100}>
                  <ListElements data={hall} />
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
                    <Select
                      style={{ width: '100%' }}
                      placeholder={t('validate.PLEASE_SELECT', {
                        field: t('user.BOOTH_TEMPLATE').toLowerCase(),
                      })}
                      defaultValue={hallTemplate?.id}
                      onChange={changeHallTemplate}
                    >
                      {hallTemplates.map(hallTemplate => (
                        <Select.Option
                          key={hallTemplate.id}
                          value={hallTemplate.id!}
                        >
                          {hallTemplate.name}
                        </Select.Option>
                      ))}
                    </Select>
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
  }
);

HallForm.defaultProps = {
  mode: 'CREATE',
};

export default HallForm;
