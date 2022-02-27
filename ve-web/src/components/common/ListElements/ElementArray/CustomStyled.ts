import styled from 'styled-components';

export const GroupWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  ${({ theme }) => theme.mixins.alignItems('center')};
`;
export const BoxWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex', '', 'wrap')};
  ${({ theme }) => theme.mixins.alignItems('center')};
`;

export const ItemBlock = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'column', '')};
  width: 20%;
  height: 100px;
`;

export const ItemBoxCircle = styled.div<{ hasdata: boolean }>`
  text-align: center;
  width: 35px;
  height: 35px;
  line-height: 35px;
  ${({ theme }) => theme.mixins.borderRadius('50%')};
  margin: 0 auto;
  cursor: pointer;
  background-color: ${({ hasdata, theme }) =>
    hasdata ? theme.colors.primaryColor : theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.whiteColor};
  &:hover {
    opacity: 0.6;
  }
`;

export const ItemBoxSquare = styled.div<{ hasdata: boolean }>`
  text-align: center;
  width: 35px;
  height: 35px;
  line-height: 35px;
  ${({ theme }) => theme.mixins.borderRadius('5px')};
  margin: 0 auto;
  cursor: pointer;
  background-color: ${({ hasdata, theme }) =>
    hasdata ? theme.colors.primaryColor : theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.whiteColor};
  &:hover {
    opacity: 0.6;
  }
`;

export const ItemText = styled.div`
  text-align: center;
  width: 100%;
  height: 35px;
  word-break: break-all;
`;
