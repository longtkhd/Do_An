import styled, { css } from 'styled-components';
import { List } from 'antd';

export const ListItem = styled(List.Item)<{ selected: boolean }>`
  ${({ theme, selected }) =>
    selected &&
    css`
      border-left: 3px solid ${theme.colors.primaryColor};
      background: ${theme.colors.lightGrey}!important;
      padding-left: 9px;
    `};
  &:hover {
    ${({ theme, selected }) =>
      !selected &&
      css`
        background-color: ${theme.colors.grey2};
        border-left: 3px solid ${theme.colors.primaryColor};
        padding-left: 9px;
      `};
  }
  cursor: pointer;
  padding: 12px;
  .sb-avatar {
    span {
      font-size: 13.3333px;
    }
  }
  .ant-list-item-meta-title {
    margin-bottom: 0;
  }
  .ant-list-item-meta-avatar {
    margin-right: 12px;
  }
`;

export const DescriptionMessage = styled.div<{ readed: boolean }>`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  color: #7a7d85;
  ${({ readed }) =>
    readed &&
    css`
      font-weight: 600;
    `}
`;

export const MessageTimeAgo = styled.div`
  font-size: 10px;
`;

export const NameMessage = styled.div<{ readed: boolean }>`
  font-weight: normal;
  font-size: 16px;
  ${({ readed }) =>
    readed &&
    css`
      font-weight: 600;
    `}
`;
