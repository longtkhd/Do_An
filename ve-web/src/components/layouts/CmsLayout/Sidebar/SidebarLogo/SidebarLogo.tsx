import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useCmsStores } from '@/hooks';
import { themeConstants } from '@/constants';
import { LayoutSiderHeader, LineBar } from './CustomStyled';
import IconBtn from '@/components/styles/IconBtn';
const {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE,
} = themeConstants;

const SidebarLogo = observer(() => {
  const { commonStore } = useCmsStores();
  const { width, themeType } = commonStore;
  let navStyle = commonStore.navStyle;
  if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
    navStyle = NAV_STYLE_DRAWER;
  }
  return (
    <LayoutSiderHeader>
      {navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR ? (
        <LineBar>
          <IconBtn
            onClick={() => {
              if (navStyle === NAV_STYLE_DRAWER) {
                commonStore.toggleCollapsedSideNav(!commonStore.navCollapsed);
              } else if (navStyle === NAV_STYLE_FIXED) {
                commonStore.onNavStyleChange(NAV_STYLE_MINI_SIDEBAR);
              } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
                commonStore.toggleCollapsedSideNav(!commonStore.navCollapsed);
              } else {
                commonStore.onNavStyleChange(NAV_STYLE_FIXED);
              }
            }}
          >
            {navStyle === NAV_STYLE_MINI_SIDEBAR ? (
              <MenuUnfoldOutlined style={{ fontSize: 20 }} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: 20 }} />
            )}
          </IconBtn>
        </LineBar>
      ) : null}

      <Link to="/" className="site-logo">
        {navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && width >= TAB_SIZE ? (
          <img alt="logo" src={require('@/assets/images/main-logo.png')} />
        ) : themeType === THEME_TYPE_LITE ? (
          <img alt="logo1" src={require('@/assets/images/main-logo.png')} />
        ) : (
          <img alt="logo2" src={require('@/assets/images/main-logo.png')} />
        )}
      </Link>
    </LayoutSiderHeader>
  );
});

export default SidebarLogo;
