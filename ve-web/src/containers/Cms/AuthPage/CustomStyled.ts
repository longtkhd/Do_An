import styled from 'styled-components';
import Background from '@/assets/images/background-login.svg';

export const AuthPageWrapper = styled.div`
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  background: url(${Background}) no-repeat;
`;
export const FormWrapper = styled.div`
  background: ${({ theme }) => theme.colors.whiteColor};
  ${({ theme }) => theme.mixins.boxShadow('rgba(0, 0, 0, 0.3) 0 4px 10px')};
  ${({ theme }) => theme.mixins.borderRadius('10px')};
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  padding: 40px;
  transform: translate(-50%, -50%);
  width: 400px;
  @media screen and (max-width: 480px) {
    width: calc(100vw - 60px);
  }
  .ant-row.ant-form-item .ant-form-item-label > label {
    color: #919699;
    font-size: 12px;
    font-weight: 300;
    ${({ theme }) => theme.mixins.flexDisPlay('flex')};
    ${({ theme }) => theme.mixins.alignItems('center')};
    line-height: 1.2;
  }
  .ant-row.ant-form-item .ant-input:not(textarea) {
    height: 40px;
    line-height: 40px;
  }
  .ant-btn {
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
  }
  .auth-form-login .remember .ant-form-item-control-input-content {
    ${({ theme }) => theme.mixins.flexDisPlay('flex')};
    ${({ theme }) => theme.mixins.alignItems('center')};
    ${({ theme }) => theme.mixins.justifyContent('space-between')};
    flex-wrap: wrap;
    line-height: 1.5;
    margin: 5px 0;
    .ant-checkbox-wrapper {
      margin-top: 0;
    }
    > * {
      margin: 5px 0 !important;
    }
  }
  .ant-checkbox-wrapper {
    line-height: 1.4;
    position: relative;
    padding-left: 25px;
    margin-top: 10px;
    .ant-checkbox {
      position: absolute;
      top: 2px;
      left: 0;
      + span {
        padding-left: 0;
      }
    }
  }
`;
export const FormTitle = styled.h1`
  color: #191919;
  margin-bottom: 0;
  font-weight: 500;
  font-size: 24px;
`;
export const FormSubtitle = styled.p`
  color: rgb(102, 102, 102);
  font-size: 14px;
  margin-bottom: 25px;
`;
export const NaviLink = styled.div<{ margin: string }>`
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  ${({ theme }) => theme.mixins.alignItems('center')};
  ${({ theme }) => theme.mixins.justifyContent('space-between')};
  flex-wrap: wrap;
  word-break: break-all;
  margin: ${({ margin }) => margin};
`;
export const ProviderWrapper = styled.div`
  margin-top: 10px;
  ${({ theme }) => theme.mixins.flexDisPlay('flex')};
  ${({ theme }) => theme.mixins.justifyContent('center')};
  text-align: center;
  .ant-btn {
    color: white;
    padding-left: 0;
    text-transform: none;
    background-color: #3d88ec;
    border: 1px solid #3d88ec;
    ${({ theme }) => theme.mixins.flexDisPlay('flex')};
    flex-wrap: nowrap;
    ${({ theme }) => theme.mixins.alignItems('center')};
    &:hover {
      background-color: #3d88ec;
      border: 1px solid #3d88ec;
      color: white;
    }
  }
  .logo-wrapper {
    background-color: ${({ theme }) => theme.colors.whiteColor};
    padding: 5px;
    height: 30px;
    margin-right: 10px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    img {
      height: 100%;
    }
  }
`;
