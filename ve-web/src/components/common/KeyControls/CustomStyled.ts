import styled, { css } from 'styled-components';

export const ContainerButtonKey = styled.div`
  position: absolute;
  z-index: 1;
  ${({ theme }) => theme.mixins.userSelect()};
  top: 10px;
  right: 10px;
  width: 124px;
`;

export const ButtonKey = styled.div<{ margin?: string; disabled?: boolean }>`
  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `};
  background: ${({ theme }) => theme.colors.primaryColor};
  height: 36px;
  width: 36px;
  ${({ theme }) => theme.mixins.boxShadow('0 1px 4px 1px rgba(0,0,0, 0.35)')};
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  ${({ theme }) => theme.mixins.justifyContent('center')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  text-align: center;
  font-size: 22px;
  border-radius: 50%;
  &:hover {
    background: ${({ theme }) => theme.colors.lightOrange};
    cursor: pointer;
  }
  .key-icon {
    color: ${({ theme }) => theme.colors.whiteColor};
  }
  ${({ disabled }) =>
    disabled &&
    css`
      background: rgba(181, 181, 181, 0.71) !important;
      cursor: not-allowed !important;
    `};
`;

export const ButtonLeftRightCenter = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
`;
