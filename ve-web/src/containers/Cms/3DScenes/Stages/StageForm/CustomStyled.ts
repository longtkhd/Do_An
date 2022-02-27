import styled from 'styled-components';

export const Image = styled.img`
  max-height: 200px;
  max-width: 100%;
  border-radius: 5px;
  cursor: pointer;
  object-fit: cover;
  &:hover {
    opacity: 0.8;
  }
`;

export const Video = styled.video`
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
