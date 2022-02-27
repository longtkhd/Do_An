import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { TooltipPlacement } from 'antd/lib/tooltip';

const StyledTooltip = styled(Tooltip)`
  margin-left: 5px;
  &:hover {
    cursor: pointer;
  }
`;

interface ButtonTooltipProps {
  placement?: TooltipPlacement;
  color?: string;
  title?: string;
}

const ButtonTooltip: React.FC<ButtonTooltipProps> = ({
  placement,
  color,
  title,
}) => {
  return (
    <StyledTooltip placement={placement} color={color} title={title}>
      <QuestionCircleOutlined />
    </StyledTooltip>
  );
};

export default ButtonTooltip;
