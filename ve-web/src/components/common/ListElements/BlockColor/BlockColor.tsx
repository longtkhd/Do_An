import React from 'react';
import { IPreset } from '@/interfaces';
import { BlockColorWrapper } from './CustomStyled';

interface BlockColorProps {
  color: IPreset;
  selectedColor: string;
  pickColor: (color: IPreset) => void;
}

const BlockColor: React.FC<BlockColorProps> = ({
  color,
  selectedColor,
  pickColor,
}) => {
  return (
    <BlockColorWrapper
      onClick={() => pickColor(color)}
      bgColor={color.value}
      selectedColor={selectedColor}
    />
  );
};

export default BlockColor;
