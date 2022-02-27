import styled, { css } from 'styled-components';

export const BlockColorWrapper = styled.div<{
  bgColor: string;
  selectedColor: string;
}>`
  cursor: pointer;
  width: 22px;
  height: 22px;
  background-color: ${({ bgColor }) => bgColor};
  border: 1px solid #ddd;
  ${({ selectedColor, bgColor }) =>
    selectedColor === bgColor
      ? css`
          width: 30px;
          height: 30px;
        `
      : ''};
`;
