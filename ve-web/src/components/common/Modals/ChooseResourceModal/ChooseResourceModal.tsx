import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Modal,
  Button,
  Form,
  Input,
  Upload,
  message,
  notification,
  Progress,
} from 'antd';
import { InboxOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { commonHelpers } from '@/helpers';
import ResourceList from './ResourceList';
import { IAsset } from '@/interfaces';
import { map } from 'lodash';
import { useCmsStores, useCommonStores } from '@/hooks';
import theme from '@/styles/theme';

const { Dragger } = Upload;

interface ChooseResourceModalProps {
  title: string;
  okText?: string;
  assetId?: number;
  onCancel: () => void;
  onOk: (item: IAsset) => void;
}

const ChooseResourceModal: React.FC<ChooseResourceModalProps> = observer(
  ({ title, okText, assetId, onCancel, onOk }) => {
    const { t } = useTranslation();
    const { authStore } = useCommonStores();
    const { assetStore } = useCmsStores();
    const [visible, setVisible] = useState<boolean>(true);
    const [tab, setTab] = useState<string>('LIST');
    const [selectedResourse, setSelectedResourse] = useState<IAsset>();

    const handleOk = async () => {
      if (tab === 'CREATE') {
        await save();
      } else {
        onOk(selectedResourse!);
        handleCancel();
      }
    };

    const handleCancel = () => {
      setVisible(false);
      commonHelpers.delay(300).then(() => onCancel());
    };

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any>([]);
    const asset: IAsset = {
      name: '',
      value: '',
      status: 'ACTIVE',
    };
    const layout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    useEffect(() => {
      if (assetStore.error) {
        notification.error({
          message: assetStore.error,
        });
      }
    }, [assetStore.error]);

    const onRemove = (file: any) => {
      setFileList([]);
      form.setFieldsValue({ file: null });
    };

    const beforeUpload = (file: any) => {
      const allowedExtensions = /(\.jpg|\.png|\.jpeg|\.gif|\.mp4|\.webm|\.mpv|\.m4v|\.m4p)$/i;
      const { name: fileName } = file;
      if (!allowedExtensions.exec(fileName)) {
        message.error(t('validate.INVALID_FILE_TYPE'));
        return false;
      }
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        message.error(t('validate.FILE_SIZE_UPLOAD', { maxSize: 50 }));
        return false;
      }
      setFileList([file]);
      form.setFieldsValue({
        file: file.name,
      });
      return false;
    };

    const save = async () => {
      form
        .validateFields()
        .then(async values => {
          values.status = true;
          const fmData = new FormData();
          map(values, (value, key) => {
            if (key === 'file' && fileList.length && value !== asset?.value) {
              const file = fileList[0];
              fmData.append(key, file, file.name);
            } else {
              fmData.append(key, value);
            }
          });
          fmData.append('type', 'MEDIA');
          fmData.append(
            'boothId',
            `${authStore.userInfo?.boothId ??
              authStore.userInfo?.organizer.boothId}`
          );
          const res = await assetStore.createAsset(fmData);
          if (res && !assetStore.error) {
            message.success(t('asset.CREATE_ASSET_SUCCESSFULLY'));
            const { asset } = res;
            onOk(asset);
            handleCancel();
          }
        })
        .catch(() => {});
    };

    return (
      <Modal
        visible={visible}
        title={t(title)}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        okText={t(okText!)}
        width={800}
        footer={
          <>
            <Button key="back" onClick={handleCancel}>
              {t('shared.CANCEL')}
            </Button>
            <Button
              key="submit"
              type="primary"
              loading={assetStore.isLoading}
              onClick={handleOk}
            >
              {t('shared.OK')}
            </Button>
          </>
        }
      >
        {tab === 'LIST' ? (
          <ResourceList
            selectedResourse={selectedResourse}
            setSelectedResourse={setSelectedResourse}
            assetId={assetId}
            setTab={setTab}
          />
        ) : (
          <Form
            {...layout}
            onFinish={save}
            form={form}
            initialValues={{
              ...asset,
              status: asset.status === 'ACTIVE' ? true : false,
            }}
          >
            <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
              <Button
                style={{ float: 'right' }}
                icon={<ArrowLeftOutlined />}
                onClick={() => setTab('LIST')}
              >
                {t('shared.BACK_TO_LIST')}
              </Button>
            </Form.Item>
            <Form.Item
              label={t('asset.NAME')}
              name="name"
              rules={[
                {
                  required: true,
                  message: t('validate.PLEASE_INPUT', {
                    field: t('asset.NAME').toLowerCase(),
                  }),
                },
              ]}
            >
              <Input placeholder={t('asset.NAME')} />
            </Form.Item>
            <Form.Item
              label={t('asset.FILE')}
              name="file"
              rules={[
                {
                  required: true,
                  message: t('validate.PLEASE_INPUT', {
                    field: t('asset.FILE').toLowerCase(),
                  }),
                },
              ]}
            >
              <>
                <Dragger
                  fileList={fileList}
                  onRemove={onRemove}
                  beforeUpload={beforeUpload}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    File support : .jpg, .png, .jpeg, .gif, .mp4, .webm, .mpv,
                    .m4v, .m4p
                  </p>
                </Dragger>
                {assetStore.uploadedPercent ? (
                  <Progress
                    strokeColor={theme.colors.primaryColor}
                    percent={assetStore.uploadedPercent}
                    status="active"
                  />
                ) : null}
              </>
            </Form.Item>
          </Form>
        )}
      </Modal>
    );
  }
);

ChooseResourceModal.defaultProps = {
  okText: 'shared.OK',
};

export default ChooseResourceModal;
