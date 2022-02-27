import styled, { css } from 'styled-components';

export const UploadWrapper = styled.div<{ shape: 'rect' | 'round' }>`
  .ant-upload-list-picture-card {
    .ant-upload-list-item,
    .ant-upload-list-item-info {
      ${({ shape }) =>
        shape === 'round' &&
        css`
          border-radius: 50%;
        `};
    }
    .ant-upload-list-item {
      padding: 2px;
      border: 1px dashed #d9d9d9;
    }
  }
  .ant-upload-select-picture-card,
  .ant-skeleton-image {
    ${({ shape }) =>
      shape === 'round' &&
      css`
        border-radius: 50%;
      `};
  }
`;
