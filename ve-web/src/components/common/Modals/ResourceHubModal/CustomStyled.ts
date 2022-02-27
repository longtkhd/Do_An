import styled from 'styled-components';
import { List } from 'antd';

export const ListItem = styled(List.Item)`
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey2};
    border-left: 3px solid ${({ theme }) => theme.colors.primaryColor};
    padding-left: 7px;
  }
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
`;

export const ResourceHubWrapper = styled.div`
  img {
    max-width: 100%;
  }
  video {
    max-width: 100%;
  }
`;
