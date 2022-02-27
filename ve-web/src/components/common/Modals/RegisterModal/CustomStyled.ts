import styled from 'styled-components';

export const CustomTitle = styled.div`
  text-align: center;
  font-size: 22px;
`;

export const LoginFormLink = styled.span`
  float: right;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primaryColor};
  :hover {
    text-decoration: underline;
  }
`;

export const NaviLink = styled.div<{ margin: string }>`
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  ${({ theme }) => theme.mixins.justifyContent('space-between')};
  flex-wrap: wrap;
  word-break: break-all;
  margin: ${({ margin }) => margin};
`;
