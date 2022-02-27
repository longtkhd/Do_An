import styled, { css } from 'styled-components';

export const MenuWrapper = styled.div`
  width: 100%;
  position: absolute;
  z-index: 3;
  height: 115px;
  top: calc(
    100vh - ${({ theme }) => theme.variables.layoutHeaderHeight * 2 + 112}px
  );
  .item-wrapper {
    color: ${({ theme }) => theme.colors.whiteColor};
    ${({ theme }) => theme.mixins.flexDisPlay('flex', 'column')};
    width: 100%;
    padding: 0;
    -webkit-box-align: center;
    -ms-flex-align: center;
    ${({ theme }) => theme.mixins.alignItems('center')};
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    ${({ theme }) => theme.mixins.justifyContent('center')};
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    cursor: pointer;
  }
  @media (min-width: ${({ theme }) => theme.mediaQueries.lg}px) {
    .ant-row {
      &.info {
        width: 33%;
      }
      &.stand {
        width: 83%;
      }
      margin: 0 auto;
    }
  }
`;

export const ItemIconWrapper = styled.div`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.whiteColor};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'column')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  ${({ theme }) => theme.mixins.justifyContent('center')};
  color: ${({ theme }) => theme.colors.whiteColor};
  text-decoration: none;
`;

export const ItemIcon = styled.div`
  background: 50%/100% no-repeat;
  height: 30px;
  width: 30px;
  margin: 15px;
  &:hover {
    opacity: 0.8;
  }
`;

export const ItemLabelWrapper = styled.div<{
  isFirst: boolean;
  isLast: boolean;
}>`
  height: 30px;
  background-color: #ebebeb !important;
  color: ${({ theme }) => theme.colors.primaryColor};
  margin-top: 10px;
  text-align: center;
  width: 100%;
  line-height: 30px;
  &:hover {
    opacity: 0.8;
  }
  ${({ isFirst }) =>
    isFirst &&
    css`
      border-radius: 30px 0px 0px 30px;
    `}
  ${({ isLast }) =>
    isLast &&
    css`
      border-radius: 0px 30px 30px 0px;
    `}
  @media (min-width: ${({ theme }) => theme.mediaQueries.sm}px) {
    font-weight: 400;
    font-size: 10px;
  }
  @media (min-width: ${({ theme }) => theme.mediaQueries.md}px) {
    font-weight: 500;
    font-size: 15px;
  }
`;

export const AboutUsTitle = styled.div`
  font-size: 32px;
  line-height: 32px;
  font-weight: 400;
`;
