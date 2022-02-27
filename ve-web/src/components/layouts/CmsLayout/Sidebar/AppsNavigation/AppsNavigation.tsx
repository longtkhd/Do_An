import React from 'react';
import {
  SearchOutlined,
  BellOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { AppsNavWrapper } from './CustomStyled';

const AppsNavigation = () => (
  <AppsNavWrapper>
    <li>
      <SearchOutlined />
    </li>
    <li>
      <BellOutlined />
    </li>
    <li>
      <MessageOutlined />
    </li>
  </AppsNavWrapper>
);

export default AppsNavigation;
