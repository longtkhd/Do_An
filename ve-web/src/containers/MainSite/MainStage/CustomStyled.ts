import styled from 'styled-components';

export const MainstageContainer = styled.div<{ background: string }>`
  height: 100%;
  background: ${({ background }) => `url(${background})`};
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center 0px;
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  position: relative;
`;
