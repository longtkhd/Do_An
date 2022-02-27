import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import {
  AuthPageWrapper,
  FormTitle,
  FormWrapper,
  FormSubtitle,
} from './CustomStyled';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useCommonStores } from '@/hooks';

interface ParamTypes {
  authType: string;
}

const AuthPage: React.FC = observer(() => {
  const history = useHistory();
  const { t } = useTranslation();
  const { authType } = useParams<ParamTypes>();
  const { authStore } = useCommonStores();

  useEffect(() => {
    if (authStore.error) {
      message.error(authStore.error);
    }
  }, [authStore.error]);

  const authFormInput = () => {
    switch (authType) {
      case 'login':
        return (
          <Fragment>
            <FormTitle>{t('auth.WELCOME_BACK')}</FormTitle>
            <FormSubtitle>{t('auth.LOGIN_SUBTITLE')}</FormSubtitle>
            <LoginForm />
          </Fragment>
        );
      case 'register':
        return (
          <Fragment>
            <FormTitle>{t('auth.REGISTER')}</FormTitle>
            <FormSubtitle>{t('auth.REGISTER_SUBTITLE')}</FormSubtitle>
            <RegisterForm />
          </Fragment>
        );
      default:
        history.push('/404');
        break;
    }
  };

  const authPageTitle = () => {
    switch (authType) {
      case 'login':
        return t('auth.LOGIN');
      case 'register':
        return t('auth.REGISTER');
      default:
        return 'Undefined';
    }
  };

  return (
    <AuthPageWrapper>
      <Helmet>
        <title>{authPageTitle()}</title>
      </Helmet>
      <FormWrapper>{authFormInput()}</FormWrapper>
    </AuthPageWrapper>
  );
});

export default AuthPage;
