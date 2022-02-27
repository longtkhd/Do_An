import styled from 'styled-components';

export const ResourceWrapper = styled.div<{ selected: boolean }>`
  ${({ theme, selected }) =>
    selected && `border: 2px solid ${theme.colors.primaryColor}`};
  cursor: pointer;
  height: 140px;
  .ant-image {
    width: 100%;
    height: 100%;
    &:before {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.3s;
      opacity: 0;
      content: ' ';
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    .ant-image {
      &:before {
        opacity: 1;
      }
    }
    .actions {
      opacity: 1;
    }
  }
`;

export const ResourceActions = styled.div`
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
  opacity: 0;
  color: rgba(255, 255, 255, 0.85);
`;
