import styled, { css } from 'styled-components';
import { List } from 'antd';

export const ListItem = styled(List.Item)<{
  selected: boolean;
  disabled: boolean;
}>`
  ${({ theme, selected }) =>
    selected &&
    css`
      border-left: 3px solid ${theme.colors.primaryColor};
      background: ${theme.colors.lightGrey}!important;
      padding-left: 7px;
    `};
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed !important;
    `};
  &:hover {
    ${({ theme, selected }) =>
      !selected &&
      css`
        background-color: ${theme.colors.grey2};
        border-left: 3px solid ${theme.colors.primaryColor};
        padding-left: 7px;
      `};
  }
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
`;
