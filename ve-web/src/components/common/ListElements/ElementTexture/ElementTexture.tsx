import React, { useState } from 'react';
import { IAttribute } from '@/interfaces';
import { Select } from 'antd';
import { useCmsStores } from '@/hooks';
import StyledHeading from '@/components/styles/StyledHeading';
import { useTranslation } from 'react-i18next';

interface ElementTextureProps {
  attrData: IAttribute;
}

const ElementTexture: React.FC<ElementTextureProps> = ({ attrData }) => {
  const { t } = useTranslation();
  const { commonStore } = useCmsStores();
  const [currentTexture, setCurrentTexture] = useState(attrData.value);

  const changeTexture = (name: string) => {
    const texture = attrData.presetValue.find(texture => texture.name === name);
    if (texture) {
      setCurrentTexture(texture);
      const attribute = {
        key: attrData.key,
        value: texture,
        assetType: attrData.assetType,
        presetValue: attrData.presetValue,
        name: attrData.name,
      } as IAttribute;
      commonStore.setDoSetAttributes(attribute);
    }
  };

  return (
    <>
      <StyledHeading fontSize={'16px'}>{attrData.name}</StyledHeading>
      <Select
        style={{ width: '100%' }}
        placeholder={t('validate.PLEASE_SELECT', {
          field: t('lobby.BACKGROUND').toLowerCase(),
        })}
        defaultValue={currentTexture.name}
        onChange={changeTexture}
      >
        {attrData.presetValue.map(texture => (
          <Select.Option key={texture.name} value={texture.name}>
            {texture.value?.title}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default React.memo(ElementTexture);
