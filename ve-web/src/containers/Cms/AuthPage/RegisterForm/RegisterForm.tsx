import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { NaviLink } from '../CustomStyled';
import { useCommonStores } from '@/hooks';
import { validator } from '@/helpers';

interface ParamTypes {
  authType: string;
}

const RegisterForm: React.FC = observer(() => {
  const history = useHistory();
  const { t } = useTranslation();
  const { authStore } = useCommonStores();
  const { authType } = useParams<ParamTypes>();

  const handleSubmit = async (values: any) => {
    if (!values.accept) {
      return message.error(t('auth.PLEASE_READ_TERMS'));
    }
    const data = {
      userName: values.userName,
      email: values.email.toLowerCase(),
      password: values.password,
      confirmed: true,
      firstName: values.firstName,
      lastName: values.lastName,
      selfRegister: true,
    };
    const res = await authStore.register(data);
    if (res && !authStore.error) {
      history.push('/auth/login');
      message.success(t('auth.REGISTER_SUCCESSFULLY'));
    }
  };

  return (
    <Form
      name="register-form"
      layout="vertical"
      className={`auth-form auth-form-${authType}`}
      onFinish={handleSubmit}
    >
      <Form.Item
        label={t('auth.USER_NAME')}
        name="userName"
        rules={[
          {
            required: true,
            message: t('validate.PLEASE_INPUT', {
              field: t('auth.USER_NAME').toLowerCase(),
            }),
          },
        ]}
      >
        <Input placeholder={t('auth.YOUR_USER_NAME')} />
      </Form.Item>
      <Form.Item
        label={t('auth.EMAIL')}
        name="email"
        rules={[
          {
            required: true,
            message: t('validate.PLEASE_INPUT', {
              field: t('auth.EMAIL').toLowerCase(),
            }),
          },
          {
            validator: validator.validateEmail,
            message: t('validate.INVALID_EMAIL'),
          },
        ]}
      >
        <Input placeholder={'Your username'} />
      </Form.Item>
      <Form.Item
        label={t('auth.PASSWORD')}
        name="password"
        rules={[
          {
            required: true,
            message: t('validate.PLEASE_INPUT', {
              field: t('auth.PASSWORD').toLowerCase(),
            }),
          },
        ]}
      >
        <Input.Password placeholder={t('auth.ENTER_PASSWORD')} />
      </Form.Item>
      <Form.Item
        label={t('auth.CONFIRM_PASSWORD')}
        name="confirm"
        rules={[
          {
            required: true,
            message: t('validate.RETYPE_PASSWORD'),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t('user.PASSWORD_NOT_MATCH')));
            },
          }),
        ]}
      >
        <Input.Password placeholder={t('auth.RE_TYPE_NEW_PASSWORD')} />
      </Form.Item>
      <Form.Item name="accept" valuePropName="checked" initialValue={true}>
        <Checkbox>
          I have read, understood, and agree with the{' '}
          <Link to={'/terms'} style={{ color: '#ff8d4f' }}>
            term of the license agreement
          </Link>
        </Checkbox>
      </Form.Item>
      <Button size={'large'} block type={'primary'} htmlType={'submit'}>
        Register
      </Button>
      <NaviLink margin={'10px 0 0'}>
        Already have an account?
        <Link to={'/auth/login'} style={{ color: '#ff8d4f' }}>
          Back to login page.
        </Link>
      </NaviLink>
    </Form>
  );
});

export default RegisterForm;
