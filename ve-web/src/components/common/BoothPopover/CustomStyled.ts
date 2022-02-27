import styled from 'styled-components';

export const PopoverContainer = styled.div<{
  top: number;
  left: number;
}>`
  border-radius: 5px;
  background-color: white;
  width: 400px;
  height: 260px;
  z-index: 10;
  padding: 15px;
  ${({ theme }) =>
    theme.mixins.boxShadow('0px 2px 12px 5px rgba(86, 86, 86, 0.40)')};
  position: absolute;
  top: ${({ top }) => top + 'px'};
  left: ${({ left }) => left + 'px'};
`;

export const PopoverBody = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
`;

export const PopoverArrow = styled.div`
  position: absolute;
  display: block;
  width: 12px;
  height: 12px;
  border: 6px solid;
  left: 50%;
  -webkit-transform: translateX(-50%) rotate(45deg);
  transform: translateX(-50%) rotate(45deg);
  bottom: -6px;
  border-color: transparent #fff #fff transparent;
  ${({ theme }) =>
    theme.mixins.boxShadow('3px 3px 7px rgba(86, 86, 86, 0.40)')};
`;
