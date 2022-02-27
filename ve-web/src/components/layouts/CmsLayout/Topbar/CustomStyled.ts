import styled from 'styled-components';
import { Layout } from 'antd';

const { Header } = Layout;

export const HeaderWapper = styled(Header)`
  ${({ theme }) => theme.mixins.boxShadow(theme.variables.cardShadowLg)};
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'row', 'wrap')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  ${({ theme }) => theme.mixins.justifyContent('space-between')};
  line-height: 1;
  padding: ${({ theme }) => theme.variables.layoutHeaderPadding};
  height: ${({ theme }) => theme.variables.layoutHeaderHeight}px;
  position: relative;
  z-index: 10;
  color: ${({ theme }) => theme.colors.headerTextColor};
  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.md - 1}px) {
    padding: ${({ theme }) => theme.variables.layoutHeaderPaddingRes};
  }
  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.xs - 1}px) {
    height: ${({ theme }) => theme.variables.layoutHeaderHeightRes}px;
  }
  .header-logo {
    img {
      max-width: 150px;
    }
    @media screen and (min-width: ${({ theme }) => theme.mediaQueries.lg}px) {
      display: none !important;
    }
  }
`;

export const HeaderNotifications = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
  margin-left: auto;
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'row', 'wrap')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  & > li {
    font-size: 18px;
    &:not(:last-child) {
      margin-right: 42px;
      .inside-header-horizontal & {
        margin-right: 20px;
      }
      .header-horizontal-main &,
      .header-horizontal-nav & {
        margin-right: 30px;
        @media screen and (max-width: ${({ theme }) =>
            theme.mediaQueries.md - 1}px) {
          margin-right: 16px;
        }
      }
      @media screen and (max-width: ${({ theme }) =>
          theme.mediaQueries.md - 1}px) {
        margin-right: 16px;
      }
    }
    &.language {
      cursor: pointer;
      font-size: 14px;
      & .language-name {
        padding: 0 0.5rem;
      }
      @media screen and (max-width: ${({ theme }) =>
          theme.mediaQueries.xs - 1}px) {
        & .language-name,
        & .icon {
          display: none;
        }
      }
    }
    &.user-nav {
      .header-horizontal-main & {
        margin-left: 50px;
        @media screen and (max-width: @screen-md-max) {
          margin-left: 0;
        }
        .inside-header-horizontal & {
          @media screen and (max-width: @screen-lg-max) {
            margin-left: 0;
          }
        }
      }
    }
  }
`;

export const LanguageMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
  & li {
    cursor: pointer;
    padding: 10px 0 10px;
    .language-name {
      padding-left: 0.5rem;
    }
    &:not(:last-child) {
      border-bottom: 1px solid #e8e8e8;
    }
  }
`;

export const IconBtn = styled.span`
  ${({ theme }) => theme.mixins.alignItems('center')};
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'row', 'wrap')};
  ${({ theme }) => theme.mixins.justifyContent('center')};
  ${({ theme }) => theme.mixins.borderRadius('2px')};
  width: 40px;
  height: 40px;
  cursor: pointer;
  &:focus,
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    .layout-sider-dark & {
      background-color: ${({ theme }) => theme.colors.navDarkBg};
    }
  }
`;
