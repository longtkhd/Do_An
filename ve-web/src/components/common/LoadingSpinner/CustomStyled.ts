import styled from 'styled-components';

export const BlockWrapper = styled.div`
  display: block;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 99999;
`;

export const SectionWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  text-align: center;
  ${({ theme }) => theme.mixins.justifyContent('center')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  padding: 32px 0;
`;

export const Spinner = styled.div`
  z-index: 99999;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  border: 8px solid transparent;
  border-bottom-color: ${({ theme }) => theme.solidColor};
  border-top-color: ${({ theme }) => theme.solidColor};
  animation: loading-spinner 0.5s infinite linear;
`;
