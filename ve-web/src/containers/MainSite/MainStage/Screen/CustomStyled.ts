import styled from 'styled-components';

export const ScreenContainer = styled.div`
  position: absolute;
  top: 2%;
  left: 21.6%;
  width: 56.8%;
  height: fit-content;
  .screen-placeholer {
    width: 100%;
    opacity: 0;
  }
  .screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .link {
      width: 100%;
      -o-object-fit: contain;
      object-fit: contain;
      .image {
        width: 100%;
        height: 100%;
        -o-object-fit: contain;
        object-fit: contain;
      }
    }
    .youtube {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

export const ZoomContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'column')};
  ${({ theme }) => theme.mixins.justifyContent('center')};
  ${({ theme }) => theme.mixins.alignItems('center')};
`;

export const ZoomHeading = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 20px;
`;
