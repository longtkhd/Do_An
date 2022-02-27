import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card, Form, Input, Switch, Button, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IAsset } from '@/interfaces';
import { useTranslation } from 'react-i18next';
import { useCmsStores, useCommonStores } from '@/hooks';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import StyledHeading from '@/components/styles/StyledHeading';
import MarkdownEditor from '@/components/common/MarkdownEditor';

interface ContentFormProps {
  asset: IAsset;
  onSave: (data: FormData) => void;
  mode?: 'CREATE' | 'EDIT';
}

const ContentForm: React.FC<ContentFormProps> = observer(
  ({ asset, mode, onSave }) => {
    const { t } = useTranslation();
    const { authStore } = useCommonStores();
    const { assetStore } = useCmsStores();
    const [form] = Form.useForm();

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [asset]);

    const save = (values: any) => {
      values.type = 'CONTENT';
      const fmData = new FormData();
      map(values, (value, key) => {
        fmData.append(key, value);
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
            <Link to="/cms/asset-library/content">
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
            label={t('asset.CONTENT')}
            name="value"
            rules={[
              {
                required: true,
                message: t('validate.PLEASE_INPUT', {
                  field: t('asset.CONTENT').toLowerCase(),
                }),
              },
            ]}
          >
            <MarkdownEditor />
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

ContentForm.defaultProps = {
  mode: 'CREATE',
};

export default ContentForm;
