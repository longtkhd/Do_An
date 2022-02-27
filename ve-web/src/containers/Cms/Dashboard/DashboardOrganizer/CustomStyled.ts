import styled from 'styled-components';

export const ReportContentWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  ${({ theme }) => theme.mixins.justifyContent('space-around')};
  ${({ theme }) => theme.mixins.alignItems('center')};
`;

export const DetailContainer = styled.div``;

export const DetailItem = styled.div``;

export const DetailItemName = styled.div`
  font-size: 17px;
`;

export const DetailItemValue = styled.div`
  font-size: 23px;
  span {
    font-weight: 500;
  }
`;
