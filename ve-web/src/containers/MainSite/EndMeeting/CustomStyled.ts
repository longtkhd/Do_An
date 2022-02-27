import styled from 'styled-components';

export const EndMeetingContainer = styled.div`
  position: fixed;
  z-index: 150;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;
  color: $gray;
  font-size: 70px;
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  ${({ theme }) => theme.mixins.justifyContent('center')};
  -webkit-box-align: center;
  -ms-flex-align: center;
  ${({ theme }) => theme.mixins.alignItems('center')};
`;
