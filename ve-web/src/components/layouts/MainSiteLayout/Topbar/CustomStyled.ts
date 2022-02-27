import styled from 'styled-components';
import { Menu, Badge } from 'antd';
import { Link } from 'react-router-dom';

export const HeaderWapper = styled.header`
  background: ${({ theme }) => theme.colors.whiteColor};
  border-bottom: 1px solid transparent;
  box-shadow: 0 2px 9px 3px rgba(86, 86, 86, 0.15);
  transition: border 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955),
    background 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  height: ${({ theme }) => theme.variables.layoutHeaderHeight}px;
  width: 100%;
  z-index: 1;
  .ant-menu-item-active .header-link {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`;

export const MenuWapper = styled(Menu)`
  border: 0;
  float: right;
  font-size: 14px;
  background: transparent;
  li {
    height: ${({ theme }) => theme.variables.layoutHeaderHeight}px;
    line-height: ${({ theme }) => theme.variables.layoutHeaderHeight}px;
    min-width: 72px;
    text-align: center;
    border-bottom-width: 3px;
    margin: 0 15px !important;
    &.ant-menu-item-selected a {
      color: ${({ theme }) => theme.colors.primaryColor};
      font-weight: bold;
    }
    &.user-profile {
      &:hover {
        border-bottom: none !important;
      }
    }
    &.user-chat {
      min-width: 0 !important;
      padding: 0 !important;
      &:hover {
        border-bottom: none !important;
      }
    }
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.mediaQueries.md - 1}px) and (min-width: 0) {
    width: 300px;
    float: none;
    margin: -12px -16px;
  }
`;

export const LogoWapper = styled(Link)`
  float: left;
  height: ${({ theme }) => theme.variables.layoutHeaderHeight}px;
  line-height: ${({ theme }) => theme.variables.layoutHeaderHeight}px;
  img {
    height: 50px;
    line-height: 50px;
    width: 150px;
  }
  span {
    float: right;
    font-size: 16px;
    height: 80px;
    line-height: 80px;
    text-transform: uppercase;
  }
  @media only screen and (min-width: 0) and (max-width: ${({ theme }) =>
      theme.mediaQueries.md - 1}px) {
    width: 150px;
    float: none;
    display: block;
  }
`;

export const LayoutSiderHeader = styled.div`
  ${({ theme }) => theme.mixins.boxShadow(theme.variables.cardShadowLg)};
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'row', 'nowrap')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  ${({ theme }) => theme.mixins.justifyContent('center')};
  padding: ${({ theme }) =>
    `10px ${theme.variables.sidebarPaddingLr}px 10px ${2 *
      theme.variables.sidebarPaddingLr +
      10}px`};
  height: ${({ theme }) => theme.variables.layoutHeaderHeight}px;
  position: relative;
  z-index: 1;
  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.xs - 1}px) {
    height: ${({ theme }) => theme.variables.layoutHeaderHeightRes}px;
  }
  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.md - 1}px) {
    padding-left: ${({ theme }) => theme.variables.sidebarPaddingLr}px;
  }
  & .site-logo {
    display: block;
    img {
      max-width: 150px;
    }
    .ant-layout-sider-collapsed & {
      display: none;
    }
    .mini-custom-sidebar & {
      display: block;
    }
  }
`;

export const NavPhoneIcon = styled.span`
  ${({ theme }) => theme.mixins.alignItems('center')};
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'row', 'wrap')};
  ${({ theme }) => theme.mixins.justifyContent('center')};
  ${({ theme }) => theme.mixins.borderRadius('2px')};
  float: right;
  margin-top: 16px;
  z-index: 1;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const NavBadgeIcon = styled.span`
  float: right;
  margin-top: 16px;
  z-index: 1;
  cursor: pointer;
  margin-right: 12px;
`;

export const EnterEvent = styled.div`
  cursor: pointer;
  float: right;
  line-height: ${({ theme }) => theme.variables.layoutHeaderHeight}px;
  :hover {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`;

export const UserPopover = styled.ul`
  margin: -12px -16px;
  padding: 7px 0;
  list-style: none;
  & li {
    cursor: pointer;
    padding: 3px 15px;
    width: 155px;
    a {
      color: #545454;
    }
    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.colors.grey2};
    }
    @media screen and (max-width: ${({ theme }) =>
        theme.mediaQueries.sm - 1}px) {
      width: 100%;
    }
  }
`;

export const AvatarName = styled.span`
  cursor: pointer;
`;

export const ChatBadge = styled(Badge)`
  .ant-badge-count {
    transform: translate(30%, -30%);
  }
  .email-btn {
    color: ${({ theme }) => theme.colors.primaryColor};
    border-color: ${({ theme }) => theme.colors.primaryColor};
  }
`;
