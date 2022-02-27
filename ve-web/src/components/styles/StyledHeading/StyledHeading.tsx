import React from 'react';
import styled from 'styled-components';
import { Tag, Space } from 'antd';

const Heading = styled.div<{ fontSize?: string; fontWeight?: string }>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '22px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'inherit')};
`;

interface StyledHeadingProps {
  name?: string;
  margin?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: string;
  tag?: string;
}

const StyledHeading: React.FC<StyledHeadingProps> = ({
  margin,
  padding,
  fontSize,
  children,
  fontWeight,
  tag,
}) => {
  return (
    <Space
      style={{ margin: margin ? margin : '', padding: padding ? padding : '' }}
    >
      <Heading fontSize={fontSize} fontWeight={fontWeight}>
        {children ? children : 'Name assets'}
      </Heading>
      {tag && <Tag color="green">{tag}</Tag>}
    </Space>
  );
};

export default StyledHeading;
