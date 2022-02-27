import React from 'react';
import { Button } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';

interface NavigationButtonProps {
  position: number;
  side: 'left' | 'right';
  label: string;
  onClick: () => void;
}

const CustomButton = styled(Button)<{ side: 'left' | 'right'; top: string }>`
  border-top-left-radius: ${({ side }) => (side === 'left' ? 0 : '32px')};
  border-bottom-left-radius: ${({ side }) => (side === 'left' ? 0 : '32px')};
  border-top-right-radius: ${({ side }) => (side === 'right' ? 0 : '32px')};
  border-bottom-right-radius: ${({ side }) => (side === 'right' ? 0 : '32px')};
  width: 170px;
  position: absolute;
  top: ${({ top }) => top};
  ${({ side }) =>
    side === 'left'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `};
  text-align: left;
`;

const NavigationButton: React.FC<NavigationButtonProps> = ({
  position,
  side,
  label,
  onClick,
}) => {
  const top = 100 + position * 55 + 'px';
  return (
    <CustomButton
      type="primary"
      side={side}
      icon={side === 'left' ? <LeftCircleOutlined /> : <RightCircleOutlined />}
      top={top}
      onClick={onClick}
    >
      {label}
    </CustomButton>
  );
};

export default NavigationButton;
