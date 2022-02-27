import React from 'react';
import { Popover, Modal, message } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { UserPopover } from './CustomStyled';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useCommonStores } from '@/hooks';
import { useHistory } from 'react-router';
import Avatar from 'react-avatar';

const { confirm } = Modal;

const UserInfo = observer(() => {
  const { t } = useTranslation();
  const { authStore } = useCommonStores();
  const history = useHistory();

  const handleLogout = () => {
    confirm({
      title: t('auth.LOGOUT'),
      content: t('account.YOU_WILL_RETURNED_TO_LOGIN_SCREEN'),
      onOk: () => {
        const { userName } = authStore.userInfo!;
        authStore.logout();
        history.push('/auth/login');
        message.success(t('account.BYE_USER', { name: userName }));
      },
    });
  };

  const userMenuOptions = (
    <UserPopover>
      <li>
        <UserOutlined /> {t('account.MY_ACCOUNT')}
      </li>
      <li onClick={handleLogout}>
        <LoginOutlined /> {t('auth.LOGOUT')}
      </li>
    </UserPopover>
  );

  return (
    <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
      <Avatar name={authStore.fullName} size="40" round={true} />
    </Popover>
  );
});

export default UserInfo;
