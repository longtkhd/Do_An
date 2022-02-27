import styled from 'styled-components';

export const TextWelcomeWrapper = styled.div<{ bottom: number }>`
  position: absolute;
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  bottom: ${({ bottom }) => bottom + 'px'};
`;

export const TextMesageWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primaryColor};
  width: 45%;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.colors.primaryColor};
  margin: 0 auto;
  margin-top: 12px;
  &:hover {
    color: ${({ theme }) => theme.colors.whiteColor};
    background-color: ${({ theme }) => theme.colors.primaryColor};
    cursor: pointer;
  }
`;

export const TextMesage = styled.div`
  word-break: keep-all;
  padding: 5px 10px;
  font-size: 14px;
  text-align: center;
  line-height: 1.2;
`;
