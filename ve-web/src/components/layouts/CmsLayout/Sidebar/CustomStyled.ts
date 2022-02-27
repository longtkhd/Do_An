import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider } = Layout;

export const SiderWapper = styled(Sider)`
  flex: 0 0 auto !important;
  &.collapsed-sidebar {
    width: 0 !important;
    min-width: 0 !important;
  }
`;
