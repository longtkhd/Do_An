import React, { ReactNode, useState } from 'react';
import { IAttribute, ModelType, IModelItem } from '@/interfaces';
import StyledHeading from '@/components/styles/StyledHeading';
import SelectModelModal from '@/components/common/Modals/SelectModelModal';
import {
  BoxWrapper,
  GroupWrapper,
  ItemBlock,
  ItemBoxCircle,
  ItemText,
  ItemBoxSquare,
} from './CustomStyled';
import { useCmsStores } from '@/hooks';

interface ElementArrayProps {
  attrData: IAttribute;
  currentHallId?: number;
}

const ElementArray: React.FC<ElementArrayProps> = ({
  attrData,
  currentHallId,
}) => {
  const { commonStore } = useCmsStores();
  const [selectModelModal, setSelectModelModal] = useState<ReactNode>();
  const showModal = (modelType: string, crrItem: IModelItem, index: number) => {
    const listItemIds: number[] = [];
    attrData.items.forEach(item => {
      if (item?.value?.id !== crrItem?.value?.id) {
        listItemIds.push(item.value?.id!);
      }
    });
    setSelectModelModal(
      <SelectModelModal
        title={'scene.SELECT_3D_MODEL'}
        modelType={modelType}
        index={index}
        modelId={crrItem.value?.id!}
        listItemIds={listItemIds}
        onCancel={handleCancel}
        onOk={handleOk}
        onRemove={handleRemove}
        currentHallId={currentHallId!}
      />
    );
  };

  const handleCancel = () => {
    setSelectModelModal(<></>);
  };

  const handleOk = (item: ModelType, index: number) => {
    if (item) {
      const oldModelItem = attrData.items[index];
      if (oldModelItem && !oldModelItem.oldModelId) {
        oldModelItem.oldModelId = oldModelItem.value?.id;
      }
      const modelItem = {
        key: attrData.key,
        index,
        value: item,
        modelId: item.id,
        oldModelId: oldModelItem.oldModelId,
        modelIdKey: attrData.modelIdKey,
        assetType: attrData.assetType,
      } as IModelItem;
      commonStore.setDoSetAttributes(modelItem);
      attrData.items[index] = {
        ...oldModelItem,
        value: item,
      };
    }
  };

  const handleRemove = (item: ModelType, index: number) => {
    const oldModelItem = attrData.items[index];
    if (oldModelItem && !oldModelItem.oldModelId) {
      oldModelItem.oldModelId = oldModelItem.value?.id;
    }
    const modelItem = {
      key: attrData.key,
      index,
      value: item,
      oldModelId: oldModelItem.oldModelId,
      modelIdKey: attrData.modelIdKey,
      assetType: attrData.assetType,
    } as IModelItem;
    commonStore.setDoSetAttributes(modelItem);
    if (attrData.items[index]) {
      attrData.items[index].value = null;
    }
  };

  return (
    <>
      <StyledHeading fontSize={'16px'} margin={'24px 0'}>
        {attrData.group_name}
      </StyledHeading>
      {attrData.boothNumber ? (
        <BoxWrapper>
          {attrData.items.map((item, index) => (
            <ItemBlock key={index}>
              <ItemBoxSquare
                key={item.key + '-' + index}
                hasdata={!!item.value}
                onClick={() => showModal(attrData.model, item, index)}
              >
                {index + 1}
              </ItemBoxSquare>
              <ItemText> {item?.value?.name || 'Empty'}</ItemText>
            </ItemBlock>
          ))}
        </BoxWrapper>
      ) : (
        <GroupWrapper>
          {attrData.items.map((item, index) => (
            <ItemBlock key={index}>
              <ItemBoxCircle
                key={item.key + '-' + index}
                hasdata={!!item.value}
                onClick={() => showModal(attrData.model, item, index)}
              >
                {index + 1}
              </ItemBoxCircle>
              <ItemText>{item?.value?.name || 'Empty'}</ItemText>
            </ItemBlock>
          ))}
        </GroupWrapper>
      )}
      {selectModelModal}
    </>
  );
};

export default React.memo(ElementArray);
