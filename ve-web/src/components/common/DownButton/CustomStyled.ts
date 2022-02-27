import styled from 'styled-components';

export const DownButtonWrapper = styled.div<{ top: string }>`
  @-webkit-keyframes scrollanim {
    0% {
      -webkit-transform: translate(0, -40px);
      opacity: 0;
    }

    60% {
      -webkit-transform: translate(0, 0);
      opacity: 0.8;
    }
  }
  @keyframes scrollanim {
    0% {
      -webkit-transform: translate(0, -40px);
      -ms-transform: translate(0, -40px);
      transform: translate(0, -40px);
      opacity: 0;
    }

    60% {
      -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
      transform: translate(0, 0);
      opacity: 0.8;
    }
  }

  @-webkit-keyframes scrollanim2 {
    0% {
      -webkit-transform: translate(0, -40px);
      opacity: 0;
    }

    60% {
      -webkit-transform: translate(0, 0px);
      opacity: 0.6;
    }
  }

  @keyframes scrollanim2 {
    0% {
      -webkit-transform: translate(0, -40px);
      -ms-transform: translate(0, -40px);
      transform: translate(0, -40px);
      opacity: 0;
    }

    60% {
      -webkit-transform: translate(0, 0px);
      -ms-transform: translate(0, 0px);
      transform: translate(0, 0px);
      opacity: 0.6;
    }
  }
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  left: 50%;
  transform: translateX(-50%);
  top: ${({ top }) => top};
  z-index: 1000;
  .down-button-icon {
    opacity: 1;
    .first-path {
      -webkit-animation: scrollanim 1s ease-in-out infinite;
      animation: scrollanim 1s ease-in-out infinite;
      -webkit-animation-delay: 0.8s;
      animation-delay: 0.8s;
    }
    .second-path {
      -webkit-animation: scrollanim2 1s ease-in-out infinite;
      animation: scrollanim2 1s ease-in-out infinite;
    }
  }
`;
