import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: ${({ theme }) => theme.mediaQueries.sm}px) {
    max-width: 540px;
  }
  @media (min-width: ${({ theme }) => theme.mediaQueries.md}px) {
    max-width: 720px;
  }
  @media (min-width: ${({ theme }) => theme.mediaQueries.lg}px) {
    max-width: 960px;
  }
  @media (min-width: ${({ theme }) => theme.mediaQueries.xl}px) {
    max-width: 1140px;
  }
`;

export default Container;
