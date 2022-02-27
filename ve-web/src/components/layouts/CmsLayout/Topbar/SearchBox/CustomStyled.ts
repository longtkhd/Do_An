import styled from 'styled-components';

export const SearchBoxWapper = styled.div`
  position: relative;
  width: 350px;
  display: none;
  & .form-group {
    width: 100%;
    height: 100%;
    margin-bottom: 0;
  }
  & input[type='search'] {
    background: rgba(250, 250, 250, 0.1);
    padding: 10px 18px 10px 40px;
    height: 46px;
    .ant-layout-header &,
    .ant-popover-content & {
      border: 0 none;
    }
    &:focus {
      ${({ theme }) => theme.mixins.boxShadow('none')};
      background-color: rgba(250, 250, 250, 0.3);
    }
  }
  & .search-icon {
    background-color: transparent;
    border: 0 none;
    color: #d9d9d9;
    width: 35px;
    height: 46px;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    position: absolute;
    left: 0;
    right: auto;
  }
  @media screen and (min-width: ${({ theme }) => theme.mediaQueries.lg}px) {
    display: block !important;
  }
`;
