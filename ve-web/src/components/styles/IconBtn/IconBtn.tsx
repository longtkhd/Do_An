import styled from 'styled-components';

const IconBtn = styled.span`
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

export default IconBtn;
