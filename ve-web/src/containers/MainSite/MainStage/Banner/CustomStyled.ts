import styled from 'styled-components';

export const BannerContainer = styled.div<{ position: string }>`
  position: absolute;
  width: 12.9%;
  top: 6%;

  .link {
    width: 100%;
    height: fit-content;
    .image {
      width: 100%;
    }
  }
  left: ${({ position }) => (position === 'left' ? '3.8%' : '83.3%')};
`;
