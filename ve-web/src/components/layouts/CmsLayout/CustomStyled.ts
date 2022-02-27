import styled from 'styled-components';
import { Layout } from 'antd';
const { Content } = Layout;

export const MainContentWrapper = styled.div`
  padding: 24px;
  flex: 1;
`;

export const ContentWrapper = styled(Content)`
  overflow-x: hidden;
  ${({ theme }) => theme.mixins.flexDisPlay('flex', 'column', 'nowrap')};
`;
