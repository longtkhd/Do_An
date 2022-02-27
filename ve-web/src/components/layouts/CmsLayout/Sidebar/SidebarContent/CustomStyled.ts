import styled from 'styled-components';

export const SidebarNotifications = styled.div`
  padding: ${({ theme }) => theme.variables.sidebarPaddingLr}px 10px 10px;
  margin: 0 ${({ theme }) => theme.variables.sidebarPaddingLr - 10}px 10px;
  border-bottom: solid 1px #e8e8e8;
  .ant-layout-sider-dark &,
  .drawer-sidebar-dark & {
    border-bottom-color: ${({ theme }) => theme.colors.navDarkTextColor};
  }
  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.md - 1}px) {
    display: none;
  }
`;

export const SidebarContentWrapper = styled.div`
  border-right: 1px solid #e8e8e8;
  .ant-menu-inline {
    border-right: 0 none;
  }
  .layout-sider-scrollbar {
    height: calc(
      100vh - ${({ theme }) => theme.variables.layoutHeaderHeight}px - 145px
    ) !important;
    .ant-layout-sider-collapsed & {
      height: calc(
        100vh - ${({ theme }) => theme.variables.layoutHeaderHeight}px - 91px
      ) !important;
    }
    @media screen and (max-width: ${({ theme }) =>
        theme.mediaQueries.md - 1}px) {
      height: calc(
        100vh - ${({ theme }) => theme.variables.layoutHeaderHeight}px
      ) !important;
    }
    @media screen and (max-width: ${({ theme }) =>
        theme.mediaQueries.xs - 1}px) {
      height: calc(
        100vh - ${({ theme }) => theme.variables.layoutHeaderHeightRes}px
      ) !important;
    }
  }
`;
