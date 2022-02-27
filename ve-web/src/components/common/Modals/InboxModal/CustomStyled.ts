import styled from 'styled-components';

export const LeftHeader = styled.div`
  font-size: 18px;
  padding: 0 24px;
  height: 55px;
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  border-right: 1px solid #f0f0f0;
`;

export const RightHeader = styled.div`
  padding: 0 24px;
  height: 55px;
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  .sb-avatar {
    span {
      font-size: 13.3333px;
    }
  }
`;

export const LeftBody = styled.div`
  border-right: 1px solid #f0f0f0;
`;

export const RightBody = styled.div``;

export const NoneSelectConversation = styled.div`
  font-size: 24px;
  text-align: center;
  padding: 24px;
`;

export const BackMobileChat = styled.span`
  font-size: 24px;
  margin-left: -15px;
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.primaryColor};
`;
