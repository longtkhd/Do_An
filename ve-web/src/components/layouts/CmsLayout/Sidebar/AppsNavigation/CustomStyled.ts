import styled from 'styled-components';

export const AppsNavWrapper = styled.ul`
  list-style: none;
  padding-left: 0;
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'row', 'nowrap')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  margin: 0 -20px;
  color: ${({ theme }) => theme.colors.primaryColor};
  .ant-layout-sider-dark &,
  .drawer-sidebar-dark & {
    color: ${({ theme }) => theme.colors.navDarkTextColor};
  }
  & li {
    padding: 0 20px;
    font-size: 16px;
    & .icon {
      cursor: pointer;
    }
  }
  .ant-layout-sider-collapsed & {
    display: none;
  }
  .mini-custom-sidebar & {
    display: block;
    margin-top: 15px;

    & li:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`;
