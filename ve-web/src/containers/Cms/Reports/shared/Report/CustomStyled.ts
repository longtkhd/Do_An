import styled from 'styled-components';

export const ReportWrapper = styled.div`
  padding: 15px 15px 15px 0;
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  ${({ theme }) => theme.mixins.alignItems('center')};
`;

export const Information = styled.div`
  margin-left: 10px;
`;

export const Name = styled.div`
  font-size: 14px;
  color: #8b8a8a;
`;

export const Figure = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.1;
`;
