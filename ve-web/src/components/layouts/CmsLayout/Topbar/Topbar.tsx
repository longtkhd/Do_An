import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react';
import { Avatar, Popover } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useCmsStores } from '@/hooks';
import { i18nConstants, themeConstants } from '@/constants';
import {
  HeaderWapper,
  HeaderNotifications,
  LanguageMenu,
  IconBtn,
} from './CustomStyled';
import SearchBox from './SearchBox';
import UserInfo from './UserInfo';
const {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE,
} = themeConstants;
const languageData = Object.values(i18nConstants.REGIONS);

const Topbar = observer(() => {
  const { commonStore } = useCmsStores();
  const { locale, width, navStyle, navCollapsed } = commonStore;
  const [searchText, setSearchText] = useState('');

  const languageMenu = () => (
    <LanguageMenu>
      {languageData.map(language => (
        <li
          key={JSON.stringify(language)}
          onClick={e => commonStore.switchLanguage(language)}
        >
          <Avatar shape="square" src={language.flag} />
          <span className="language-name">{language.name}</span>
        </li>
      ))}
    </LanguageMenu>
  );

  const updateSearchChatUser = (evt: any) => {
    setSearchText(evt.target.value);
  };
  return (
    <HeaderWapper>
      {navStyle === NAV_STYLE_DRAWER ||
      ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) &&
        width < TAB_SIZE) ? (
        <IconBtn style={{ marginRight: '1rem' }}>
          <MenuOutlined
            style={{ fontSize: 20 }}
            onClick={() => {
              commonStore.toggleCollapsedSideNav(!navCollapsed);
            }}
          />
        </IconBtn>
      ) : null}
      <Link to="/" className="header-logo">
        <img alt="" src={require('@/assets/images/main-logo.png')} />
      </Link>
      <SearchBox
        placeholder="Search in app..."
        onChange={updateSearchChatUser}
        value={searchText}
      />
      <HeaderNotifications>
        <li className="language">
          <Popover
            placement="bottomRight"
            content={languageMenu()}
            trigger="click"
          >
            <Avatar shape="square" src={locale.flag} />
            <span className="language-name">{locale.name}</span>
            <DownOutlined style={{ fontSize: 10 }} className="icon" />
          </Popover>
        </li>
        {width >= TAB_SIZE ? null : (
          <Fragment>
            <li className="user-nav">
              <UserInfo />
            </li>
          </Fragment>
        )}
      </HeaderNotifications>
    </HeaderWapper>
  );
});

export default Topbar;
