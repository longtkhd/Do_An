import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useCmsStores } from '@/hooks';
import { themeConstants } from '@/constants';
import { IRoute } from '@/interfaces';
import { SidebarNotifications, SidebarContentWrapper } from './CustomStyled';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SidebarLogo from '../SidebarLogo';
import UserProfile from '../UserProfile';
import AppsNavigation from '../AppsNavigation';
const { THEME_TYPE_LITE } = themeConstants;

const SidebarContent = observer(() => {
  const { pathname } = useLocation();
  const { commonStore } = useCmsStores();
  const { themeType } = commonStore;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const selectedKeys = [pathname];
    setSelectedKeys(selectedKeys);
    setOpenKeys(findOpenKeys(selectedKeys[0].split('/')));
  }, [pathname]);

  const onSelectMenu = ({ key }: any) => {
    setSelectedKeys([key]);
  };

  const onOpenChange = (keys: any[]) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    const rootKeys = commonStore.appMenus.map(item => item.path);
    if (rootKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const findOpenKeys = (keys: string[]) => {
    const openKeys = [];
    for (let index = 1; index < keys.length; index++) {
      const sliceKeys = keys.slice(1, index);
      if (sliceKeys.length) {
        openKeys.push(`/${sliceKeys.join('/')}`);
      }
    }
    return openKeys;
  };

  const renderMenuItem = (item: IRoute) => (
    <Menu.Item key={item.path}>
      <Link to={item.path + (item.query || '')}>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </Link>
    </Menu.Item>
  );

  const renderSubMenu = (item: IRoute) => {
    return (
      <Menu.SubMenu
        key={item.path}
        title={
          <span>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </span>
        }
      >
        {item.subs!.map(sub =>
          sub.subs ? renderSubMenu(sub) : renderMenuItem(sub)
        )}
      </Menu.SubMenu>
    );
  };

  return (
    <>
      <SidebarLogo />
      <SidebarContentWrapper>
        <SidebarNotifications>
          <UserProfile />
          <AppsNavigation />
        </SidebarNotifications>
        <PerfectScrollbar className="layout-sider-scrollbar">
          <Menu
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            theme={themeType === THEME_TYPE_LITE ? 'light' : 'dark'}
            mode="inline"
            onClick={onSelectMenu}
            onOpenChange={onOpenChange}
          >
            {commonStore.appMenus.map(item =>
              item.subs! ? renderSubMenu(item) : renderMenuItem(item)
            )}
          </Menu>
        </PerfectScrollbar>
      </SidebarContentWrapper>
    </>
  );
});

export default SidebarContent;
