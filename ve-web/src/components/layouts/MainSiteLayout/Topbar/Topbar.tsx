import React, { useEffect, useState } from 'react';
import { Menu, Row, Col, Popover, Modal, message, Button, Drawer } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  LoginOutlined,
  DownOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import {
  HeaderWapper,
  LogoWapper,
  MenuWapper,
  NavPhoneIcon,
  EnterEvent,
  UserPopover,
  AvatarName,
  NavBadgeIcon,
  ChatBadge,
  LayoutSiderHeader,
} from './CustomStyled';
import { useMediaQuery } from 'react-responsive';
import { configConstants } from '@/constants';
import { useCommonStores, useMainSiteStores } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import Container from '@/components/styles/Container';
import LoginModal from '@/components/common/Modals/LoginModal';
import RegisterModal from '@/components/common/Modals/RegisterModal';
import InboxModal from '@/components/common/Modals/InboxModal';
import Avatar from 'react-avatar';

const { confirm } = Modal;

const Topbar: React.FC = observer(() => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const { commonStore } = useMainSiteStores();
  const { authStore, chatStore } = useCommonStores();

  const onToggleCollapsedNav = () => {
    commonStore.toggleCollapsedSideNav(!commonStore.navCollapsed);
  };
  const isTablet = useMediaQuery({
    query: '(max-device-width: 991px)',
  });
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const selectedKeys = [pathname];
    setSelectedKeys(selectedKeys);
  }, [pathname]);

  const showLoginModal = () => {
    if (authStore.isLoggedIn) {
      return history.push('/lobby');
    }
    commonStore.setVisibleLoginModal(true);
  };

  const onSelectMenu = ({ key }: any) => {
    setSelectedKeys([key]);
  };

  const handleLogout = () => {
    confirm({
      title: t('mainSite.EXIT_EVENT'),
      content: t('mainSite.YOU_WILL_RETURNED_TO_LANDING_PAGE'),
      onOk: () => {
        const { userName } = authStore.userInfo!;
        authStore.logout();
        history.push('/');
        message.success(t('account.BYE_USER', { name: userName }));
      },
    });
  };

  const userMenuOptions = (
    <UserPopover className="hello">
      <li>
        <UserOutlined /> {t('mainSite.MY_ACCOUNT')}
      </li>
      {authStore.userInfo?.roleId && (
        <li>
          <Link to="/cms/dashboard">
            <SettingOutlined /> {t('mainSite.CMS_DASHBOARD')}
          </Link>
        </li>
      )}
      <li onClick={handleLogout}>
        <LoginOutlined /> {t('mainSite.EXIT_EVENT')}
      </li>
    </UserPopover>
  );

  const countNotification = () => {
    return chatStore.conversations.filter(
      conversation => conversation.notificationUser
    ).length;
  };

  const commonMenuItem = [
    <React.Fragment key={uuidv4()}>
      <Menu.Item key="/lobby">
        <Link style={{ fontWeight: 'inherit' }} to="/lobby">
          {t('mainSite.LOBBY').toUpperCase()}
        </Link>
      </Menu.Item>
      <Menu.Item key={`/booth/${commonStore.organizer?.infoDeskId}`}>
        <Link
          style={{ fontWeight: 'inherit' }}
          to={`/booth/${commonStore.organizer?.infoDeskId}`}
        >
          {t('mainSite.INFO_DESK').toUpperCase()}
        </Link>
      </Menu.Item>
      <Menu.Item key={`/booth/${commonStore.organizer?.boothId}`}>
        <Link
          style={{ fontWeight: 'inherit' }}
          to={`/booth/${commonStore.organizer?.boothId}`}
        >
          {t('mainSite.ORGANIZER_BOOTH').toUpperCase()}
        </Link>
      </Menu.Item>
      <Menu.Item key="docs/pattern">
        {t('mainSite.EXHIBITOR_LIST').toUpperCase()}
      </Menu.Item>
    </React.Fragment>,
  ];

  const menu = [
    <MenuWapper
      mode={'horizontal'}
      defaultSelectedKeys={['/lobby']}
      selectedKeys={selectedKeys}
      key="nav"
      onClick={onSelectMenu}
    >
      {commonMenuItem}
      <Menu.SubMenu
        title={
          <ChatBadge count={countNotification()}>
            <Button
              className="email-btn"
              size="large"
              shape="circle"
              icon={<MailOutlined style={{ marginRight: 0 }} />}
              onClick={() => chatStore.setVisibleInboxModal(true)}
            />
          </ChatBadge>
        }
        className="user-chat"
      />
      {authStore.userInfo && (
        <Menu.SubMenu
          title={
            <Popover
              placement="bottomRight"
              content={userMenuOptions}
              trigger="click"
            >
              <div style={{ height: 65 }}>
                <Avatar
                  className="avatar"
                  style={{ marginRight: '8px' }}
                  name={authStore.fullName}
                  size="40"
                  round={true}
                />
                <AvatarName>
                  {authStore.fullName}
                  <DownOutlined
                    style={{ fontSize: 10, marginLeft: '0.5rem' }}
                  />
                </AvatarName>
              </div>
            </Popover>
          }
          className="user-profile"
        />
      )}
    </MenuWapper>,
  ];

  return (
    <HeaderWapper id="header">
      <Container>
        {isTablet && authStore.isLoggedIn && pathname !== '/' ? (
          <>
            <NavPhoneIcon onClick={onToggleCollapsedNav}>
              <MenuOutlined />
            </NavPhoneIcon>
            <NavBadgeIcon>
              <ChatBadge count={countNotification()}>
                <Button
                  className="email-btn"
                  size="large"
                  shape="circle"
                  icon={<MailOutlined style={{ marginRight: 0 }} />}
                  onClick={() => chatStore.setVisibleInboxModal(true)}
                />
              </ChatBadge>
            </NavBadgeIcon>
            <Drawer
              placement="left"
              closable={false}
              onClose={onToggleCollapsedNav}
              visible={commonStore.navCollapsed}
              bodyStyle={{ padding: 0 }}
            >
              <LayoutSiderHeader>
                <Link to="/" className="site-logo">
                  <img
                    alt="logo"
                    src={`${configConstants.ASSETS_URL}/lobbies/${commonStore.lobby?.id}/${commonStore.lobby?.logo}`}
                  />
                </Link>
              </LayoutSiderHeader>
              <Menu
                defaultSelectedKeys={['/lobby']}
                selectedKeys={selectedKeys}
                key="nav"
                mode="inline"
                onClick={onSelectMenu}
              >
                {commonMenuItem}
                {authStore.userInfo && (
                  <>
                    <Menu.SubMenu
                      title={
                        <>
                          <Avatar
                            className="avatar"
                            style={{ marginRight: '8px' }}
                            name={authStore.fullName}
                            size="40"
                            round={true}
                          />
                          <AvatarName>{authStore.fullName}</AvatarName>
                        </>
                      }
                    >
                      <Menu.Item>
                        <UserOutlined /> {t('mainSite.MY_ACCOUNT')}
                      </Menu.Item>
                      <Menu.Item>
                        <Link to="/cms/dashboard">
                          <SettingOutlined /> {t('mainSite.CMS_DASHBOARD')}
                        </Link>
                      </Menu.Item>
                      <Menu.Item onClick={handleLogout}>
                        <LoginOutlined /> {t('mainSite.EXIT_EVENT')}
                      </Menu.Item>
                    </Menu.SubMenu>
                  </>
                )}
              </Menu>
            </Drawer>
          </>
        ) : null}
        <Row>
          <Col lg={4} md={5} sm={12} xs={12}>
            <LogoWapper to="/">
              <img
                alt="logo"
                src={`${configConstants.ASSETS_URL}/lobbies/${commonStore.lobby?.id}/${commonStore.lobby?.logo}`}
              />
            </LogoWapper>
          </Col>
          <Col lg={20} md={19} sm={12} xs={12}>
            {pathname !== '/' ? (
              !isTablet && menu
            ) : (
              <EnterEvent onClick={showLoginModal}>
                {commonStore.landing?.button}
              </EnterEvent>
            )}
          </Col>
        </Row>
      </Container>
      {authStore.userInfo && <InboxModal />}
      <LoginModal />
      <RegisterModal />
    </HeaderWapper>
  );
});

export default Topbar;
