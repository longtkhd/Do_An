import React from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { NaviLink, ProviderWrapper } from '../CustomStyled';
import { useCommonStores } from '@/hooks';
import { parse } from 'query-string';
import googleLogo from '@/assets/images/google-logo.png';

interface ParamTypes {
  authType: string;
}

const LoginForm: React.FC = observer(() => {
  const history = useHistory();
  const { search } = useLocation();
  const { authStore } = useCommonStores();
  const { authType } = useParams<ParamTypes>();
  const { t } = useTranslation();
  const handleSubmit = async (values: any) => {
    const user = await authStore.login(values);
    if (user && !authStore.error) {
      message.success(
        t('account.WELCOME_USER', {
          name: user.userName,
        })
      );
      const query = parse(search);
      const redirect = query.redirect || '/cms/dashboard';
      history.push(redirect.toString());
    }
  };
  return (
    <Form
      name="login-form"
      layout="vertical"
      className={`auth-form auth-form-${authType}`}
      onFinish={handleSubmit}
    >
      <Form.Item
        label={t('auth.USER_NAME')}
        name="usernameOrEmail"
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
        <Input.Password placeholder={t('auth.YOUR_PASSWORD')} />
      </Form.Item>
      <Form.Item className={'remember'}>
        <Form.Item
          name="remember"
          valuePropName="checked"
          initialValue={true}
          noStyle
        >
          <Checkbox>{t('auth.REMEMBER_ME')}</Checkbox>
        </Form.Item>
        <Link
          className="login-form-forgot"
          to="/auth/forgot-password"
          style={{ color: '#ff8d4f' }}
        >
          {t('auth.FORGOT_PASSWORD')}
        </Link>
      </Form.Item>
      <Button
        loading={authStore.isLoading}
        block
        size={'large'}
        type={'primary'}
        htmlType={'submit'}
      >
        {t('auth.LOGIN')}
      </Button>
      <NaviLink margin={'15px 0'}>
        <span>{t('auth.DONT_HAVE_ACCOUNT')}</span>
        <Link to={'/auth/register'} style={{ color: '#ff8d4f' }}>
          {t('auth.REGISTER_ACCOUNT')}
        </Link>
      </NaviLink>
      <ProviderWrapper>
        <a href={`connect/google`}>
          <Button>
            <div className="logo-wrapper">
              <img src={googleLogo} alt="google" />
            </div>
            {t('auth.SIGN_IN_WITH_GOOGLE')}
          </Button>
        </a>
      </ProviderWrapper>
    </Form>
  );
});

export default LoginForm;
