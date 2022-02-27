import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Card,
  Form,
  Input,
  Switch,
  Button,
  notification,
  Upload,
  message,
  Progress,
} from 'antd';
import { ArrowLeftOutlined, InboxOutlined } from '@ant-design/icons';
import { IAsset } from '@/interfaces';
import { useTranslation } from 'react-i18next';
import { useCmsStores, useCommonStores } from '@/hooks';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import StyledHeading from '@/components/styles/StyledHeading';
import theme from '@/styles/theme';

const { Dragger } = Upload;

interface MediaFormProps {
  asset: IAsset;
  onSave: (data: FormData) => void;
  mode?: 'CREATE' | 'EDIT';
}

const MediaForm: React.FC<MediaFormProps> = observer(
  ({ asset, mode, onSave }) => {
    const { t } = useTranslation();
    const { authStore } = useCommonStores();
    const { assetStore } = useCmsStores();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any>([]);

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

    useEffect(() => {
      form.resetFields();
      if (asset?.value) {
        setFileList([
          {
            name: asset.value,
          },
        ]);
        form.setFieldsValue({
          file: asset.value,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [asset]);

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

    const save = (values: any) => {
      values.type = 'MEDIA';
      const fmData = new FormData();
      map(values, (value, key) => {
        if (key === 'file' && fileList.length && value !== asset?.value) {
          const file = fileList[0];
          fmData.append(key, file, file.name);
        } else {
          fmData.append(key, value);
        }
      });
      fmData.append(
        'boothId',
        `${authStore.userInfo?.boothId ??
          authStore.userInfo?.organizer.boothId}`
      );
      onSave(fmData);
    };

    return (
      <Card
        title={
          <StyledHeading>
            {mode === 'CREATE'
              ? t('asset.CREATE_ASSET')
              : t('asset.UPDATE_ASSET')}
          </StyledHeading>
        }
        extra={
          <Button>
            <Link to="/cms/asset-library/media">
              <ArrowLeftOutlined /> {t('shared.BACK')}
            </Link>
          </Button>
        }
      >
        <Form
          {...layout}
          onFinish={save}
          form={form}
          initialValues={{
            ...asset,
            status: asset.status === 'ACTIVE' ? true : false,
          }}
        >
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
            label={t('asset.STATUS')}
            name="status"
            valuePropName="checked"
          >
            <Switch />
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
          <Form.Item
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 14, offset: 6 },
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={assetStore.isLoading}
            >
              {t('shared.SAVE')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
);

MediaForm.defaultProps = {
  mode: 'CREATE',
};

export default MediaForm;
