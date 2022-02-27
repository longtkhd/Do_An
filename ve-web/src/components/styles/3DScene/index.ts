import styled from 'styled-components';

export const LeftContent = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.mediaQueries.lg}px) {
    border-right: 1px solid #ddd;
    padding-right: 24px;
  }
`;

export const RightContent = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.mediaQueries.lg}px) {
    margin-left: 24px;
  }
`;

export const ScenePreview = styled.div<{ height?: string }>`
  width: 100%;
  height: ${({ height }) => (height ? height : '100%')};
  position: relative;
`;

export const SceneWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const ProgressWrapper = styled.div`
  position: absolute;
  top: calc(50% + 11px);
  width: 205px;
  left: calc(50% + 12px);
  transform: translate(-50%, 0);
  .ant-progress-text {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`;

export const SceneContainer = styled.div<{ overflow?: string }>`
  width: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: ${({ overflow }) => (overflow ? overflow : 'hidden')};
  height: calc(100vh - ${({ theme }) => theme.variables.layoutHeaderHeight}px);
`;

export const NavigationMobileContainer = styled.div`
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'row', 'wrap')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  -webkit-box-align: center;
  -ms-flex-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 60px;
  background-color: #f8f9fa;
  box-shadow: 0 0.5rem 1rem 0 rgb(44 51 73 / 60%);
  padding-bottom: env(safe-area-inset-bottom);
  -webkit-transition: bottom 0.4s;
  transition: bottom 0.4s;
  z-index: 999;
`;

export const NavigationMobileIcon = styled.div`
  text-align: center;
  & > div {
    margin: 0 auto;
  }
`;

export const NavigationMobileTitle = styled.div`
  height: auto;
  font-size: 12px;
  opacity: 1;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.primaryColor};
`;

export const NavigationMobileButton = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  padding-top: 6px;
  padding-bottom: 6px;
  -webkit-transition: 0.6s;
  transition: 0.6s;
  text-align: center;
`;
