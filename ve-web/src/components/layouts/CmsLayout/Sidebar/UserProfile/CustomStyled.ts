import styled from 'styled-components';

export const UserProfileWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'row', 'wrap')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  margin-bottom: 1.5rem !important;
  .ant-layout-sider-collapsed & {
    margin-bottom: 0 !important;
  }
  & .avatar {
    ${({ theme }) => theme.mixins.transition('all 0.3s ease-out')};
    position: relative;
    left: 0;

    .ant-layout-sider-collapsed & {
      margin: 0 !important;
      left: -5px;
    }
  }
`;

export const UserPopover = styled.ul`
  margin: -12px -16px;
  padding: 7px 0;
  list-style: none;
  & li {
    cursor: pointer;
    padding: 3px 15px;
    width: 150px;
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
  .ant-layout-sider-collapsed & {
    display: none;
  }
`;
