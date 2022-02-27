import styled from 'styled-components';

export const TimeDividerWrapper = styled.div`
  min-height: fit-content;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  ${({ theme }) => theme.mixins.justifyContent('center')};
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'row')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
`;

export const TimeDividerContent = styled.div`
  font-size: 10px;
  position: absolute;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.whiteColor};
  padding: 0 5px;
`;
