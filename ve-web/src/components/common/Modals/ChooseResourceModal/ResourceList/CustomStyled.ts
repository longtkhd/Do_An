import styled from 'styled-components';

export const HeaderTool = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  ${({ theme }) => theme.mixins.justifyContent('space-between')};
  margin-bottom: 24px;
`;
