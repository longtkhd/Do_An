import styled from 'styled-components';

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

export const LineBar = styled.div`
  ${({ theme }) => theme.mixins.transition('all 0.3s ease-out')};
  position: absolute;
  left: ${({ theme }) => theme.variables.sidebarPaddingLr - 10}px;
  z-index: 1;
  top: 15px;
  .ant-layout-sider-collapsed & {
    left: 20px;
  }
  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.md - 1}px) {
    display: none;
  }
`;
