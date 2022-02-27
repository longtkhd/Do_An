import styled from 'styled-components';
import Container from '@/components/styles/Container';

export const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.variables.layoutHeaderHeight}px);
`;

export const HomeBanner = styled.div<{ background: string }>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${({ background }) => `url("${background}")`};
`;

export const HomeContent = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export const ContentWrapper = styled.div`
  width: 70%;
  padding-top: 8%;
  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.lg - 1}px) {
    width: 100%;
    padding-top: 10%;
  }
`;

export const Title = styled.div`
  line-height: 5.5rem;
  color: black;
  font-size: 5rem;
  margin-bottom: 15px;
  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.lg - 1}px) {
    line-height: 4.5rem;
    font-size: 4rem;
  }
  @media screen and (max-width: ${({ theme }) => theme.mediaQueries.md - 1}px) {
    line-height: 50px;
    font-size: 42px;
    font-weight: 400;
  }
`;

export const Description = styled.div`
  color: black;
  font-size: 18px;
  text-align: justify;
`;
