import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Button, Checkbox, message, Alert } from 'antd';
import { CustomTitle, LoginFormLink, NaviLink } from './CustomStyled';
import { useTranslation } from 'react-i18next';
import { useCommonStores, useMainSiteStores } from '@/hooks';
import { parse } from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import RoundInput from '@/components/styles/RoundInput';

const LoginModal: React.FC = observer(() => {
  const history = useHistory();
  const { search } = useLocation();
  const { t } = useTranslation();
  const { authStore } = useCommonStores();
  const { commonStore } = useMainSiteStores();

  useEffect(() => {
    if (authStore.error && commonStore.visibleLoginModal) {
      message.error(authStore.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.error]);

  const handleCancel = () => {
    commonStore.setVisibleLoginModal(false);
  };

  const handleSubmit = async (values: any) => {
    const user = await authStore.login(values);
    if (user && !authStore.error) {
      handleCancel();
      message.success(
        t('account.WELCOME_USER', {
          name: user.userName,
        })
      );
      const query = parse(search);
      const redirect = query.redirect || '/lobby';
      history.push(redirect.toString());
    }
  };

  const showRegisterModal = () => {
    handleCancel();
    commonStore.setVisibleRegisterModal(true);
  };

  const LoginForm = observer(() => {
    return (
      <Form name="login-form" layout="vertical" onFinish={handleSubmit}>
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
          <RoundInput size="large" placeholder={t('auth.YOUR_USER_NAME')} />
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
          <RoundInput
            size="large"
            type="password"
            placeholder={t('auth.YOUR_PASSWORD')}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            initialValue={true}
          >
            <Checkbox>{t('auth.REMEMBER_ME')}</Checkbox>
          </Form.Item>
          <LoginFormLink>{t('auth.FORGOT_PASSWORD')}</LoginFormLink>
        </Form.Item>
        <Button
          loading={authStore.isLoading}
          block
          size={'large'}
          type={'primary'}
          htmlType={'submit'}
          shape="round"
        >
          {t('auth.LOGIN')}
        </Button>
        <NaviLink margin={'15px 0'}>
          <span>{t('auth.DONT_HAVE_ACCOUNT')}</span>
          <LoginFormLink onClick={showRegisterModal}>
            {t('auth.REGISTER_ACCOUNT')}
          </LoginFormLink>
        </NaviLink>
      </Form>
    );
  });

  return (
    <Modal
      visible={commonStore.visibleLoginModal}
      title={<CustomTitle>ENTER EVENT</CustomTitle>}
      onCancel={() => handleCancel()}
      footer={null}
      wrapClassName="login-modal"
      bodyStyle={{ padding: 40 }}
      width={commonStore.landing?.isAllowLogin ? 480 : 700}
    >
      {commonStore.landing?.isAllowLogin ? (
        <LoginForm />
      ) : (
        <Alert
          message="Informational Notes"
          description={commonStore.landing?.disableLoginMessage}
          type="info"
          showIcon
        />
      )}
    </Modal>
  );
});

export default LoginModal;
