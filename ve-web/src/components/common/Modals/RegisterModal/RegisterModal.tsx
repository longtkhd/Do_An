import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Button, Checkbox, message } from 'antd';
import { Link } from 'react-router-dom';
import { useCommonStores, useMainSiteStores } from '@/hooks';
import { CustomTitle, LoginFormLink, NaviLink } from './CustomStyled';
import { useTranslation } from 'react-i18next';
import RoundInput from '@/components/styles/RoundInput';
import RoundInputPassword from '@/components/styles/RoundInputPassword';
import { validator } from '@/helpers';

const RegisterModal: React.FC = observer(() => {
  const { t } = useTranslation();
  const { commonStore } = useMainSiteStores();
  const { authStore } = useCommonStores();

  useEffect(() => {
    if (authStore.error && commonStore.visibleRegisterModal) {
      message.error(authStore.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.error]);

  const handleCancel = () => {
    commonStore.setVisibleRegisterModal(false);
  };

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
      showLoginModal();
      message.success(t('auth.REGISTER_SUCCESSFULLY'));
    }
  };

  const showLoginModal = () => {
    handleCancel();
    commonStore.setVisibleLoginModal(true);
  };

  return (
    <Modal
      visible={commonStore.visibleRegisterModal}
      title={<CustomTitle>REGISTER</CustomTitle>}
      onCancel={() => handleCancel()}
      footer={null}
      wrapClassName="register-modal"
      bodyStyle={{ padding: 40 }}
      width={480}
    >
      <Form name="login-form" layout="vertical" onFinish={handleSubmit}>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            label={t('auth.FIRST_NAME')}
            name="firstName"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            rules={[
              {
                required: true,
                message: t('validate.PLEASE_INPUT', {
                  field: t('auth.FIRST_NAME').toLowerCase(),
                }),
              },
            ]}
          >
            <RoundInput size="large" placeholder={t('auth.YOUR_FIRST_NAME')} />
          </Form.Item>
          <Form.Item
            label={t('auth.LAST_NAME')}
            name="lastName"
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              marginLeft: 8,
            }}
            rules={[
              {
                required: true,
                message: t('validate.PLEASE_INPUT', {
                  field: t('auth.LAST_NAME').toLowerCase(),
                }),
              },
            ]}
          >
            <RoundInput size="large" placeholder={t('auth.YOUR_LAST_NAME')} />
          </Form.Item>
        </Form.Item>
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
          <RoundInput size="large" placeholder={t('auth.YOUR_USER_NAME')} />
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
          <RoundInput size="large" placeholder={t('auth.YOUR_EMAIL')} />
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
          <RoundInputPassword
            size="large"
            placeholder={t('auth.ENTER_PASSWORD')}
          />
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
          <RoundInputPassword
            size="large"
            placeholder={t('auth.RE_TYPE_NEW_PASSWORD')}
          />
        </Form.Item>
        <Form.Item name="accept" valuePropName="checked" initialValue={true}>
          <Checkbox>
            I have read, understood, and agree with the{' '}
            <Link to={'/terms'} style={{ color: '#ff8d4f' }}>
              term of the license agreement
            </Link>
          </Checkbox>
        </Form.Item>
        <Button
          loading={authStore.isLoading}
          block
          size={'large'}
          type={'primary'}
          htmlType={'submit'}
          shape="round"
        >
          {t('auth.REGISTER')}
        </Button>
        <NaviLink margin={'15px 0'}>
          <LoginFormLink onClick={showLoginModal}>
            {t('auth.REGISTERED_ENTER_EVENT')}
          </LoginFormLink>
        </NaviLink>
      </Form>
    </Modal>
  );
});

export default RegisterModal;
