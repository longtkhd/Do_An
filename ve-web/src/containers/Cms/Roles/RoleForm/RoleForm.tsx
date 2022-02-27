import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card, Form, Input, Switch, Button, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IRole } from '@/interfaces';
import { useTranslation } from 'react-i18next';
import { useCmsStores } from '@/hooks';
import { Link } from 'react-router-dom';
import StyledHeading from '@/components/styles/StyledHeading';

interface RoleFormProps {
  role: IRole;
  onSave: (data: IRole) => void;
  mode?: 'CREATE' | 'EDIT';
}

const RoleForm: React.FC<RoleFormProps> = observer(({ role, mode, onSave }) => {
  const { t } = useTranslation();
  const { roleStore } = useCmsStores();
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
    if (roleStore.error) {
      notification.error({
        message: roleStore.error,
      });
    }
  }, [roleStore.error]);

  useEffect(() => {
    form.resetFields();
  }, [role, form]);

  return (
    <Card
      title={
        <StyledHeading>
          {mode === 'CREATE' ? t('role.CREATE_ROLE') : t('role.UPDATE_ROLE')}
        </StyledHeading>
      }
      extra={
        <Button>
          <Link to="/cms/roles/list">
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
          ...role,
          status: role.status === 'ACTIVE' ? true : false,
        }}
      >
        <Form.Item
          label={t('role.NAME')}
          name="name"
          rules={[
            {
              required: true,
              message: t('validate.PLEASE_INPUT', {
                field: t('role.NAME').toLowerCase(),
              }),
            },
          ]}
        >
          <Input placeholder={t('role.NAME')} />
        </Form.Item>
        <Form.Item
          label={t('role.STATUS')}
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
            loading={roleStore.isLoading}
          >
            {t('shared.SAVE')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
});

RoleForm.defaultProps = {
  mode: 'CREATE',
};

export default RoleForm;
