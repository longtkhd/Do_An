import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card, Form, Input, Switch, Button, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IUser } from '@/interfaces';
import { useTranslation } from 'react-i18next';
import { useCmsStores } from '@/hooks';
import { Link } from 'react-router-dom';
import { validator } from '@/helpers';
import StyledHeading from '@/components/styles/StyledHeading';

interface OrganizerFormProps {
  user: IUser;
  onSave: (data: IUser) => void;
  mode?: 'CREATE' | 'EDIT';
}

const OrganizerForm: React.FC<OrganizerFormProps> = observer(
  ({ user, mode, onSave }) => {
    const { t } = useTranslation();
    const { userStore } = useCmsStores();
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
      if (userStore.error) {
        notification.error({
          message: userStore.error,
        });
      }
    }, [userStore.error]);

    useEffect(() => {
      form.resetFields();
    }, [user, form]);

    return (
      <Card
        title={
          <StyledHeading>
            {mode === 'CREATE'
              ? t('user.CREATE_ORGANIZER')
              : t('user.UPDATE_ORGANIZER')}
          </StyledHeading>
        }
        extra={
          <Button>
            <Link to="/cms/users/organizers">
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
            ...user,
            status: user.status === 'ACTIVE' ? true : false,
          }}
        >
          <Form.Item
            label={t('user.FIRST_NAME')}
            name="firstName"
            rules={[
              {
                required: true,
                message: t('validate.PLEASE_INPUT', {
                  field: t('user.FIRST_NAME').toLowerCase(),
                }),
              },
            ]}
          >
            <Input placeholder={t('user.FIRST_NAME')} />
          </Form.Item>
          <Form.Item
            label={t('user.LAST_NAME')}
            name="lastName"
            rules={[
              {
                required: true,
                message: t('validate.PLEASE_INPUT', {
                  field: t('user.LAST_NAME').toLowerCase(),
                }),
              },
            ]}
          >
            <Input placeholder={t('user.LAST_NAME')} />
          </Form.Item>
          <Form.Item
            label={t('user.USER_NAME')}
            name="userName"
            rules={[
              {
                required: true,
                message: t('validate.PLEASE_INPUT', {
                  field: t('user.USER_NAME').toLowerCase(),
                }),
              },
            ]}
          >
            <Input
              readOnly={mode === 'EDIT'}
              placeholder={t('user.USER_NAME')}
            />
          </Form.Item>
          <Form.Item
            label={t('user.EMAIL')}
            name="email"
            rules={[
              {
                required: true,
                message: t('validate.PLEASE_INPUT', {
                  field: t('user.EMAIL').toLowerCase(),
                }),
              },
              {
                validator: validator.validateEmail,
                message: t('validate.INVALID_EMAIL'),
              },
            ]}
          >
            <Input readOnly={mode === 'EDIT'} placeholder={t('user.EMAIL')} />
          </Form.Item>
          {mode === 'CREATE' && (
            <>
              <Form.Item
                label={t('user.PASSWORD')}
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('validate.PLEASE_INPUT', {
                      field: t('user.PASSWORD').toLowerCase(),
                    }),
                  },
                ]}
              >
                <Input.Password placeholder={t('user.PASSWORD')} />
              </Form.Item>
              <Form.Item
                label={t('user.CONFIRM_PASSWORD')}
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: t('validate.PLEASE_INPUT', {
                      field: t('user.CONFIRM_PASSWORD').toLowerCase(),
                    }),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(t('user.PASSWORD_NOT_MATCH'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder={t('user.CONFIRM_PASSWORD')} />
              </Form.Item>
            </>
          )}
          <Form.Item
            label={t('user.STATUS')}
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
              loading={userStore.isLoading}
            >
              {t('shared.SAVE')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
);

OrganizerForm.defaultProps = {
  mode: 'CREATE',
};

export default OrganizerForm;
