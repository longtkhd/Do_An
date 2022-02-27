import React, { FunctionComponent, useEffect, useState } from 'react';
import { Row, Col, Space } from 'antd';
import { CameraFilled } from '@ant-design/icons';
import { merge, filter } from 'lodash';
import { useTranslation } from 'react-i18next';
import { StyledIcon } from './CustomStyled';
import StyledHeading from '@/components/styles/StyledHeading';
import ElementItemBasic from './ElementItemBasic';
import ElementArray from './ElementArray';
import ElementColor from './ElementColor';
import ElementTexture from './ElementTexture';
import { v4 as uuidv4 } from 'uuid';
import { IAttribute } from '@/interfaces';
import { configConstants } from '@/constants';
interface ListElementsProps {
  data: any;
}

interface ElementByTypeProps {
  assetTypes: string[];
  groupName?: string;
  icon?: FunctionComponent<{ className?: string }>;
  currentHallId: number;
}

interface ElementItemProps {
  attrData: IAttribute;
  currentHallId?: number;
}

const ElementItem: React.FC<ElementItemProps> = ({
  attrData,
  currentHallId,
}) => {
  switch (attrData.assetType) {
    case configConstants.assetTypes.IMAGE:
    case configConstants.assetTypes.VIDEO:
      return <ElementItemBasic attrData={attrData} />;
    case configConstants.assetTypes.COLOR:
      return <ElementColor attrData={attrData} />;
    case configConstants.assetTypes.TEXTURE_OPTIONS:
      return <ElementTexture attrData={attrData} />;
    case configConstants.assetTypes.GROUP_SCENE:
      if (attrData.boothNumber && !attrData.items.length) {
        attrData.items = Array(attrData.boothNumber).fill(false);
      } else {
        if (
          attrData.boothNumber - attrData.items.length < 0 &&
          attrData.boothNumber
        ) {
          attrData.items = attrData.items.slice(0, attrData.boothNumber);
        } else if (
          attrData.boothNumber - attrData.items.length > 0 &&
          attrData.boothNumber
        ) {
          attrData.items = attrData.items.concat(
            Array(attrData.boothNumber - attrData.items.length).fill(false)
          );
        }
      }
      return <ElementArray currentHallId={currentHallId} attrData={attrData} />;
    default:
      return <></>;
  }
};

const ListElements: React.FC<ListElementsProps> = ({ data }) => {
  const { t } = useTranslation();
  const [attributes, setAttributes] = useState<{ [key: string]: IAttribute }>();

  useEffect(() => {
    setAttributes(merge({}, data.sceneTemplate.attributes, data.attributes));
  }, [data]);

  const elementTypes = [
    {
      currentHallId: data.id,
      assetTypes: [configConstants.assetTypes.TEXTURE_OPTIONS],
    },
    {
      currentHallId: data.id,
      assetTypes: [configConstants.assetTypes.COLOR],
    },
    {
      currentHallId: data.id,
      assetTypes: [configConstants.assetTypes.GROUP_SCENE],
    },
    {
      currentHallId: data.id,
      assetTypes: [
        configConstants.assetTypes.IMAGE,
        configConstants.assetTypes.VIDEO,
      ],
      groupName: t('scene.BOOTH_MEDIA'),
      icon: CameraFilled,
    },
  ];

  const ElementByType = ({
    assetTypes,
    groupName,
    icon: Icon,
    currentHallId,
  }: ElementByTypeProps) => {
    const span =
      assetTypes.includes(configConstants.assetTypes.GROUP_SCENE) ||
      assetTypes.includes(configConstants.assetTypes.TEXTURE_OPTIONS)
        ? 24
        : 12;
    const list = filter(attributes, value =>
      assetTypes.includes(value.assetType)
    );
    if (!list.length) return <></>;
    return (
      <>
        {groupName && (
          <Col span={24}>
            <StyledHeading fontSize={'20px'} margin={'24px 0px 24px'}>
              <Space>
                {Icon && (
                  <StyledIcon>
                    <Icon />
                  </StyledIcon>
                )}
                {groupName}
              </Space>
            </StyledHeading>
          </Col>
        )}
        {list.map(item => (
          <Col key={item.key} span={span} style={{ marginBottom: 16 }}>
            <ElementItem currentHallId={currentHallId} attrData={item} />
          </Col>
        ))}
      </>
    );
  };

  return (
    <Row gutter={16}>
      {elementTypes.map(element => (
        <ElementByType
          key={uuidv4()}
          currentHallId={element.currentHallId}
          assetTypes={element.assetTypes}
          groupName={element.groupName}
          icon={element.icon}
        />
      ))}
    </Row>
  );
};

export default React.memo(ListElements);
