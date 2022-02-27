import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Card,
  Form,
  Input,
  Switch,
  Button,
  notification,
  Select,
  Image,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ISceneTemplate, IUser } from '@/interfaces';
import { useTranslation } from 'react-i18next';
import { useCmsStores } from '@/hooks';
import { Link, useHistory } from 'react-router-dom';
import { validator } from '@/helpers';
import StyledHeading from '@/components/styles/StyledHeading';
import { configConstants } from '@/constants';

interface BoothOwnerFormProps {
  user: IUser;
  onSave: (data: IUser) => void;
  mode?: 'CREATE' | 'EDIT';
}

const BoothOwnerForm: React.FC<BoothOwnerFormProps> = observer(
  ({ user, mode, onSave }) => {
    const history = useHistory();
    const { t } = useTranslation();
    const { userStore, sceneTemplateStore } = useCmsStores();
    const [form] = Form.useForm();
    const [boothTemplate, setBoothTemplate] = useState<ISceneTemplate>();
    const [boothTemplates, setBoothTemplates] = useState<ISceneTemplate[]>([]);

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
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
      if (!(user as any).sceneTemplateId && boothTemplates.length) {
        form.setFieldsValue({
          sceneTemplateId: boothTemplates[0].id,
        });
      }
      setBoothTemplate(
        boothTemplates.find(
          boothTemplate =>
            form.getFieldValue('sceneTemplateId') === boothTemplate.id
        )
      );
    }, [user, form, boothTemplates]);

    const changeBoothTemplate = (boothTemplateId: number) => {
      setBoothTemplate(
        boothTemplates.find(
          boothTemplate => boothTemplateId === boothTemplate.id
        )
      );
    };

    return (
      <Card
        title={
          <StyledHeading>
            {mode === 'CREATE'
              ? t('user.CREATE_BOOTH_OWNER')
              : t('user.UPDATE_BOOTH_OWNER')}
          </StyledHeading>
        }
        extra={
          <Button>
            <Link to="/cms/users/booth-owners">
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
            label={t('user.BOOTH_NAME')}
            name="boothName"
            rules={[
              {
                required: true,
                message: t('validate.PLEASE_INPUT', {
                  field: t('user.BOOTH_NAME').toLowerCase(),
                }),
              },
            ]}
          >
            <Input
              readOnly={mode === 'EDIT'}
              placeholder={t('user.BOOTH_NAME')}
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
            label={t('user.BOOTH_TEMPLATE')}
            name="sceneTemplateId"
            rules={[
              {
                required: true,
                message: t('validate.PLEASE_SELECT', {
                  field: t('user.BOOTH_TEMPLATE').toLowerCase(),
                }),
              },
            ]}
          >
            <Select
              placeholder={t('validate.PLEASE_SELECT', {
                field: t('user.BOOTH_TEMPLATE').toLowerCase(),
              })}
              onChange={changeBoothTemplate}
            >
              {boothTemplates.map(boothTemplate => (
                <Select.Option key={boothTemplate.id} value={boothTemplate.id}>
                  {boothTemplate.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {boothTemplate && (
            <Form.Item
              wrapperCol={{
                xs: { span: 24 },
                sm: { span: 14, offset: 6 },
              }}
            >
              <Image
                width={'100%'}
                src={`/sceneTemplates/${boothTemplate.id}/${boothTemplate.thumb}`}
              />
            </Form.Item>
          )}

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

BoothOwnerForm.defaultProps = {
  mode: 'CREATE',
};

export default BoothOwnerForm;
