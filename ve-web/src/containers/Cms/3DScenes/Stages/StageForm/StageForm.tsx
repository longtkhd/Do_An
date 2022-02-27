import React, { ReactNode, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
  Checkbox,
  Space,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IAsset, IStage, IZoomMeeting } from '@/interfaces';
import { useTranslation } from 'react-i18next';
import { useCmsStores } from '@/hooks';
import { Link } from 'react-router-dom';
import { Image, Video } from './CustomStyled';
import StyledHeading from '@/components/styles/StyledHeading';
import ChooseResourceModal from '@/components/common/Modals/ChooseResourceModal';
import { configConstants } from '@/constants';
import { cloneDeep } from 'lodash';

const { Option } = Select;

interface StageFormProps {
  stage: IStage;
  onSave: (data: IStage) => void;
  mode?: 'CREATE' | 'EDIT';
}

interface ImageInputProps {
  name: string;
  stageAssets: IAsset[];
  value?: string;
  onChange?: (value: any) => void;
  showChooseResourceModal: (key: string, asset: IAsset | undefined) => void;
}

const ImageInput: React.FC<ImageInputProps> = React.memo(
  ({ name, value, stageAssets, showChooseResourceModal, onChange }) => {
    const { t } = useTranslation();
    const asset = stageAssets.find(asset => asset.key === name);

    const handleChange = (event: any) => {
      if (onChange) {
        onChange(event.target.value);
      }
    };

    return (
      <>
        <Form.Item label={t('stage.URL')}>
          <Input
            value={value}
            onChange={handleChange}
            placeholder={t('stage.URL')}
          />
        </Form.Item>
        <Form.Item>
          <Image
            onClick={() => showChooseResourceModal(name, asset)}
            src={asset?.value || require('@/assets/images/no-image.png')}
          />
        </Form.Item>
      </>
    );
  }
);

interface VideoInputProps {
  name: string;
  stageAssets: IAsset[];
  value?: string;
  onChange?: (value: any) => void;
  showChooseResourceModal: (key: string, asset: IAsset | undefined) => void;
}

const VideoInput: React.FC<VideoInputProps> = React.memo(
  ({ name, value, stageAssets, showChooseResourceModal, onChange }) => {
    const { t } = useTranslation();
    const asset = stageAssets.find(asset => asset.key === name);

    const handleChange = (event: any) => {
      if (onChange) {
        onChange(event.target.value);
      }
    };

    return (
      <>
        <Form.Item label={t('stage.URL')}>
          <Input
            value={value}
            onChange={handleChange}
            placeholder={t('stage.URL')}
          />
        </Form.Item>
        <Form.Item>
          {asset?.value ? (
            <Video
              controls
              onClick={() => showChooseResourceModal(name, asset)}
            >
              <source
                src={asset?.value}
                type='video/mp4; codecs="avc1.42E01E, mp4a.40.2'
              />
            </Video>
          ) : (
            <Image
              onClick={() => showChooseResourceModal(name, asset)}
              src={require('@/assets/images/no-image.png')}
            />
          )}
        </Form.Item>
      </>
    );
  }
);

interface BackgroundInputProps {
  name: string;
  stageAssets: IAsset[];
  showChooseResourceModal: (key: string, asset: IAsset | undefined) => void;
}

const BackgroundInput: React.FC<BackgroundInputProps> = React.memo(
  ({ name, stageAssets, showChooseResourceModal }) => {
    const { t } = useTranslation();
    const asset = stageAssets.find(asset => asset.key === name);

    return (
      <Form.Item label={t('stage.BACKGROUND')}>
        <Image
          onClick={() => showChooseResourceModal(name, asset)}
          src={asset?.value || require('@/assets/images/no-image.png')}
        />
      </Form.Item>
    );
  }
);

interface CentreScreenByTypeProps {
  type: string | undefined;
  stageAssets: IAsset[];
  showChooseResourceModal: (key: string, asset: IAsset | undefined) => void;
}

const CentreScreenByType: React.FC<CentreScreenByTypeProps> = React.memo(
  ({ type, stageAssets, showChooseResourceModal }) => {
    const { t } = useTranslation();
    switch (type) {
      case 'IMAGE':
        return (
          <Form.Item name="centreScreenUrl">
            <ImageInput
              name="centreScreenUrl"
              stageAssets={stageAssets}
              showChooseResourceModal={showChooseResourceModal}
            />
          </Form.Item>
        );
      case 'VIDEO':
        return (
          <Form.Item name="centreScreenUrl">
            <VideoInput
              name="centreScreenUrl"
              stageAssets={stageAssets}
              showChooseResourceModal={showChooseResourceModal}
            />
          </Form.Item>
        );
      case 'ZOOM':
        return (
          <Form.Item name="zoomMeeting">
            <ZoomMeetingInput />
          </Form.Item>
        );
      case 'YOUTUBE':
        return (
          <Form.Item name="youtubeUrl" label={t('stage.YOUTUBE_VIDEO_URL')}>
            <Input placeholder={t('stage.YOUTUBE_VIDEO_URL')} />
          </Form.Item>
        );
      default:
        return <></>;
    }
  }
);

interface ZoomMeetingInputProps {
  value?: IZoomMeeting;
  onChange?: (value: any) => void;
}

const ZoomMeetingInput: React.FC<ZoomMeetingInputProps> = React.memo(
  ({ value: zoomMeeting, onChange }) => {
    const { t } = useTranslation();

    const handleChange = (value: any, key: string) => {
      if (onChange) {
        onChange({
          ...zoomMeeting,
          [key]: value,
        });
      }
    };

    return (
      <>
        <Form.Item label={t('stage.API_KEY')}>
          <Input
            value={zoomMeeting?.apiKey}
            onChange={e => handleChange(e.target.value, 'apiKey')}
            placeholder={t('stage.API_KEY')}
          />
        </Form.Item>
        <Form.Item label={t('stage.API_SECRET')}>
          <Input.Password
            value={zoomMeeting?.apiSecret}
            onChange={e => handleChange(e.target.value, 'apiSecret')}
            placeholder={t('stage.API_SECRET')}
          />
        </Form.Item>
        <Form.Item label={t('stage.MEETING_ID')}>
          <Input
            value={zoomMeeting?.meetingId}
            onChange={e => handleChange(e.target.value, 'meetingId')}
            placeholder={t('stage.MEETING_ID')}
          />
        </Form.Item>
        <Form.Item label={t('stage.MEETING_PASSWORD')}>
          <Input.Password
            value={zoomMeeting?.meetingPassword}
            onChange={e => handleChange(e.target.value, 'meetingPassword')}
            placeholder={t('stage.MEETING_PASSWORD')}
          />
        </Form.Item>
        <Form.Item name="passwordRequired">
          <Checkbox
            checked={zoomMeeting?.passwordRequired}
            onChange={e => handleChange(e.target.checked, 'passwordRequired')}
          >
            {t('stage.REQUIRED_USER_TO_ENTER_PASSWORD')}
          </Checkbox>
        </Form.Item>
      </>
    );
  }
);

const StageForm: React.FC<StageFormProps> = observer(
  ({ stage, mode, onSave }) => {
    const { t } = useTranslation();
    const { stageStore } = useCmsStores();
    const [form] = Form.useForm();
    const [type, setType] = useState<string>();
    const [stageAssets, setStageAssets] = useState<IAsset[]>([]);
    const [chooseResourceModal, setChooseResourceModal] = useState<ReactNode>();

    const showChooseResourceModal = (
      key: string,
      asset: IAsset | undefined
    ) => {
      setChooseResourceModal(
        <ChooseResourceModal
          title={'scene.ADD_RESOURCE_TO_BOOTH'}
          assetId={asset?.id}
          onCancel={handleCancel}
          onOk={e => handleOk(e, key, asset)}
        />
      );
    };

    const handleCancel = () => {
      setChooseResourceModal(<></>);
    };

    const handleOk = (item: IAsset, key: string, asset: IAsset | undefined) => {
      if (item) {
        const value = `${configConstants.ASSETS_URL}/assets/${item.id}/${item.value}`;
        const newAsset = {
          key,
          name: item.name,
          assetId: item.id,
          value,
          oldAssetId: asset?.id,
          dirty: true,
        } as IAsset;
        if (asset) {
          const newStageAssets = cloneDeep(stageAssets);
          newStageAssets.splice(
            newStageAssets.findIndex((asset: IAsset) => asset.key === key),
            1,
            newAsset
          );
          setStageAssets(newStageAssets);
        } else {
          setStageAssets(origin => [...origin, newAsset]);
        }
      }
    };

    const centreScreenTypes = [
      { name: 'Zoom Meeting', value: 'ZOOM' },
      { name: 'Image', value: 'IMAGE' },
      { name: 'Video', value: 'VIDEO' },
      { name: 'Youtube', value: 'YOUTUBE' },
    ];

    useEffect(() => {
      if (stageStore.error) {
        notification.error({
          message: stageStore.error,
        });
      }
    }, [stageStore.error]);

    useEffect(() => {
      setType(stage.type ? stage.type : centreScreenTypes[0].value);
      setStageAssets(
        stage?.assets?.map((item: any) => ({
          ...item,
          value: `${configConstants.ASSETS_URL}/assets/${item.id}/${item.value}`,
        })) || []
      );
      form.resetFields();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stage]);

    const onChangeType = (value: any, key: string) => {
      setStageAssets(stageAssets.filter(asset => asset.key !== key));
      setType(value);
    };

    const save = () => {
      form
        .validateFields()
        .then(values => {
          values = {
            ...values,
            status: stage?.status === 'ACTIVE',
            assets: stageAssets.filter((asset: any) => asset.dirty),
          };
          onSave(values);
        })
        .catch(() => {});
    };

    return (
      <Card
        title={
          <StyledHeading>
            {mode === 'CREATE'
              ? t('stage.CREATE_STAGE')
              : t('stage.UPDATE_STAGE')}
          </StyledHeading>
        }
        extra={
          <Space>
            <Button>
              <Link to="/cms/pages/stages">
                <ArrowLeftOutlined /> {t('shared.BACK')}
              </Link>
            </Button>
            <Button
              type="primary"
              loading={stageStore.isLoading}
              onClick={save}
            >
              {t('shared.SAVE')}
            </Button>
          </Space>
        }
      >
        {chooseResourceModal}
        <Form
          layout="vertical"
          onFinish={onSave}
          form={form}
          initialValues={{
            ...stage,
            type: stage.type ? stage.type : centreScreenTypes[0].value,
            status: stage.status === 'ACTIVE' ? true : false,
          }}
        >
          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
              <Form.Item
                label={t('stage.STAGE_NAME')}
                name="name"
                rules={[
                  {
                    required: true,
                    message: t('validate.PLEASE_INPUT', {
                      field: t('stage.STAGE_NAME').toLowerCase(),
                    }),
                  },
                ]}
              >
                <Input placeholder={t('stage.STAGE_NAME')} />
              </Form.Item>
              <Form.Item name="background">
                <BackgroundInput
                  name="background"
                  stageAssets={stageAssets}
                  showChooseResourceModal={showChooseResourceModal}
                />
              </Form.Item>

              <Form.Item>
                <Form.Item
                  label={t('stage.CENTRE_SCREEN')}
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: t('validate.PLEASE_SELECT', {
                        field: t('stage.CENTRE_SCREEN').toLowerCase(),
                      }),
                    },
                  ]}
                >
                  <Select
                    placeholder={t('shared.PLEASE_SELECT_AN_OPTION')}
                    onChange={value => onChangeType(value, 'centreScreenUrl')}
                  >
                    {centreScreenTypes.map(item => (
                      <Option key={item.value} value={item.value}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Card>
                    <CentreScreenByType
                      type={type}
                      stageAssets={stageAssets}
                      showChooseResourceModal={showChooseResourceModal}
                    />
                  </Card>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
              <Form.Item label={t('stage.LEFT_BANNER')}>
                <Card>
                  <Form.Item name="bannerLeftUrl">
                    <ImageInput
                      name="bannerLeftUrl"
                      stageAssets={stageAssets}
                      showChooseResourceModal={showChooseResourceModal}
                    />
                  </Form.Item>
                </Card>
              </Form.Item>
              <Form.Item label={t('stage.RIGHT_BANNER')}>
                <Card>
                  <Form.Item name="bannerRightUrl">
                    <ImageInput
                      name="bannerRightUrl"
                      stageAssets={stageAssets}
                      showChooseResourceModal={showChooseResourceModal}
                    />
                  </Form.Item>
                </Card>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
);

StageForm.defaultProps = {
  mode: 'CREATE',
};

export default StageForm;
