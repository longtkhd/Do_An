import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card, Form, Input, Switch, Button, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IPermission } from '@/interfaces';
import { useTranslation } from 'react-i18next';
import { useCmsStores } from '@/hooks';
import { Link } from 'react-router-dom';
import StyledHeading from '@/components/styles/StyledHeading';

interface PermissionFormProps {
  permission: IPermission;
  onSave: (data: IPermission) => void;
  mode?: 'CREATE' | 'EDIT';
}

const PermissionForm: React.FC<PermissionFormProps> = observer(
  ({ permission, mode, onSave }) => {
    const { t } = useTranslation();
    const { permissionStore } = useCmsStores();
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
      if (permissionStore.error) {
        notification.error({
          message: permissionStore.error,
        });
      }
    }, [permissionStore.error]);

    useEffect(() => {
      form.resetFields();
    }, [permission, form]);

    return (
      <Card
        title={
          <StyledHeading>
            {mode === 'CREATE'
              ? t('permission.CREATE_PERMISSION')
              : t('permission.UPDATE_PERMISSION')}
          </StyledHeading>
        }
        extra={
          <Button>
            <Link to="/cms/permissions/list">
              <ArrowLeftOutlined /> {t('shared.BACK')}
            </Link>
          </Button>
        }
      >
        <Form
          {...layout}
          onFinish={onSave}
          form={form}
          initialValues={{
            ...permission,
            status: permission.status === 'ACTIVE' ? true : false,
          }}
        >
          <Form.Item
            label={t('permission.NAME')}
            name="name"
            rules={[
              {
                required: true,
                message: t('validate.PLEASE_INPUT', {
                  field: t('permission.NAME').toLowerCase(),
                }),
              },
            ]}
          >
            <Input placeholder={t('permission.NAME')} />
          </Form.Item>
          <Form.Item
            label={t('permission.CODE')}
            name="code"
            rules={[
              {
                required: true,
                message: t('validate.PLEASE_INPUT', {
                  field: t('permission.CODE').toLowerCase(),
                }),
              },
            ]}
          >
            <Input placeholder={t('permission.CODE')} />
          </Form.Item>
          <Form.Item
            label={t('permission.STATUS')}
            name="status"
            valuePropName="checked"
          >
            <Switch />
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
              loading={permissionStore.isLoading}
            >
              {t('shared.SAVE')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
);

PermissionForm.defaultProps = {
  mode: 'CREATE',
};

export default PermissionForm;
