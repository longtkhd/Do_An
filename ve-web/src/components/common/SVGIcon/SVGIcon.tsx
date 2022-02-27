import React from 'react';
import styled, { css } from 'styled-components';

const IconWrapper = styled.div<{
  width?: number;
  height?: number;
  color?: string;
}>`
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `};
  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `};
  svg {
    width: 100%;
    height: 100%;
    ${({ color }) =>
      color &&
      css`
        path {
          fill: ${color};
        }
      `};
  }
`;
interface SVGIconProps {
  content: any;
  width?: number;
  height?: number;
  color?: string;
  style?: object;
  className?: string;
}

const SVGIcon: React.FC<SVGIconProps> = props => {
  const { content, width, height, color, style, className } = props;
  return (
    <IconWrapper
      className={className || ''}
      width={width}
      height={height}
      color={color}
      style={style}
    >
      {content}
    </IconWrapper>
  );
};

export default SVGIcon;
