import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import SidebarContent from './SidebarContent';
import { observer } from 'mobx-react';
import { useCmsStores } from '@/hooks';
import { themeConstants } from '@/constants';
import { SiderWapper } from './CustomStyled';
const {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE,
} = themeConstants;

const Sidebar = observer(() => {
  const { commonStore } = useCmsStores();

  const { themeType, width, navStyle, navCollapsed } = commonStore;

  const onToggleCollapsedNav = () => {
    commonStore.toggleCollapsedSideNav(!navCollapsed);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      commonStore.updateWindowWidth(window.innerWidth);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let drawerStyle = 'collapsed-sidebar';

  if (navStyle === NAV_STYLE_FIXED) {
    drawerStyle = '';
  } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
    drawerStyle = 'mini-sidebar mini-custom-sidebar';
  } else if (navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
    drawerStyle = 'custom-sidebar';
  } else if (navStyle === NAV_STYLE_MINI_SIDEBAR) {
    drawerStyle = 'mini-sidebar';
  } else if (navStyle === NAV_STYLE_DRAWER) {
    drawerStyle = 'collapsed-sidebar';
  }
  if (
    (navStyle === NAV_STYLE_FIXED ||
      navStyle === NAV_STYLE_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) &&
    width < TAB_SIZE
  ) {
    drawerStyle = 'collapsed-sidebar';
  }
  return (
    <SiderWapper
      width={240}
      className={`app-sidebar ${drawerStyle} ${
        themeType !== THEME_TYPE_LITE ? 'layout-sider-dark' : null
      }`}
      trigger={null}
      collapsed={
        width < TAB_SIZE
          ? false
          : navStyle === NAV_STYLE_MINI_SIDEBAR ||
            navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR
      }
      theme={themeType === THEME_TYPE_LITE ? 'light' : 'dark'}
      collapsible
    >
      {navStyle === NAV_STYLE_DRAWER || width < TAB_SIZE ? (
        <Drawer
          className={`drawer-sidebar ${
            themeType !== THEME_TYPE_LITE ? 'drawer-sidebar-dark' : null
          }`}
          placement="left"
          closable={false}
          onClose={onToggleCollapsedNav}
          visible={navCollapsed}
          bodyStyle={{ padding: 0 }}
        >
          <SidebarContent />
        </Drawer>
      ) : (
        <SidebarContent />
      )}
    </SiderWapper>
  );
});
export default Sidebar;
