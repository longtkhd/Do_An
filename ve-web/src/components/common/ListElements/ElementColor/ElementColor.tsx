import React, { useState } from 'react';
import { IAttribute, IPreset } from '@/interfaces';
import { Space } from 'antd';
import { useCmsStores } from '@/hooks';
import BlockColor from '../BlockColor';
import StyledHeading from '@/components/styles/StyledHeading';

interface ElementColorProps {
  attrData: IAttribute;
}

const ElementColor: React.FC<ElementColorProps> = ({ attrData }) => {
  const { commonStore } = useCmsStores();
  const [currentColor, setCurrentColor] = useState(attrData.value);

  const pickColor = (color: IPreset) => {
    setCurrentColor(color);
    const attribute = {
      key: attrData.key,
      value: color,
      assetType: attrData.assetType,
      name: attrData.name,
    } as IAttribute;
    commonStore.setDoSetAttributes(attribute);
  };

  return (
    <>
      <StyledHeading fontSize={'16px'}>{attrData.name} </StyledHeading>
      <Space>
        {attrData.presetValue.map((color, index) => (
          <BlockColor
            key={attrData.key + '-' + index}
            color={color}
            selectedColor={currentColor.value}
            pickColor={pickColor}
          />
        ))}
      </Space>
    </>
  );
};

export default React.memo(ElementColor);
