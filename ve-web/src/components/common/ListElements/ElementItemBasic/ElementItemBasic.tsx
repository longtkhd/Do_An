import React, { ReactNode, useEffect, useState } from 'react';
import { IAction, IAsset, IAttribute } from '@/interfaces';
import { Button, Tooltip, Space } from 'antd';
import { EditOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Image, BlockWrapper, ActionWrapper } from './CustomStyled';
import { useTranslation } from 'react-i18next';
import { useCmsStores } from '@/hooks';
import { configConstants } from '@/constants';
import { commonHelpers } from '@/helpers';
import StyledHeading from '@/components/styles/StyledHeading';
import ChooseResourceModal from '@/components/common/Modals/ChooseResourceModal';
import SetActionModal from '@/components/common/Modals/SetActionModal';

interface ElementItemBasicProps {
  attrData: IAttribute;
}

const ElementItemBasic: React.FC<ElementItemBasicProps> = ({ attrData }) => {
  const { t } = useTranslation();
  const { commonStore } = useCmsStores();
  const [chooseResourceModal, setChooseResourceModal] = useState<ReactNode>();
  const [setActionModal, setSetActionModal] = useState<ReactNode>();
  const [currentResource, setCurrentResource] = useState<IAttribute>();
  const [resourceView, setResourceView] = useState<ReactNode>();
  const [showAction, setShowAction] = useState<boolean>(false);

  useEffect(() => {
    const src = currentResource?.value || attrData.value;
    if (src) {
      if (commonHelpers.isVideo(src)) {
        setResourceView(
          <video
            style={{ float: 'left' }}
            height="103"
            crossOrigin="anonymous"
            autoPlay={false}
            loop
            muted
            playsInline
            controls
          >
            <source
              src={src}
              type='video/mp4; codecs="avc1.42E01E, mp4a.40.2'
            />
          </video>
        );
      } else {
        setResourceView(
          <Image src={src} onClick={() => showChooseResourceModal()} />
        );
      }
    } else {
      setResourceView(
        <Image
          src={require('@/assets/images/noimage-thumb.png')}
          onClick={() => showChooseResourceModal()}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentResource]);

  const showChooseResourceModal = () => {
    const handleCancel = () => {
      setChooseResourceModal(<></>);
    };

    const handleOk = (item: IAsset) => {
      if (item) {
        if (!attrData.oldAssetId) {
          attrData.oldAssetId = attrData.assetId;
        }
        const value = `${configConstants.ASSETS_URL}/assets/${item.id}/${item.value}`;
        const currResourse = {
          key: attrData.key,
          assetId: item.id,
          value,
          oldAssetId: attrData.oldAssetId,
          assetType: attrData.assetType,
        } as IAttribute;
        setCurrentResource(currResourse);
        commonStore.setDoSetAttributes(currResourse);
      }
    };
    setChooseResourceModal(
      <ChooseResourceModal
        title={'scene.ADD_RESOURCE_TO_BOOTH'}
        assetId={currentResource?.assetId || attrData.assetId}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    );
  };

  const showSetActionModal = () => {
    const handleCancel = () => {
      setSetActionModal(<></>);
    };

    const handleOk = (action: IAction) => {
      attrData.action = action;
      const currResourse = {
        assetType: configConstants.assetTypes.ACTION,
        key: attrData.key,
        name: attrData.name,
        ...action,
      } as IAttribute;
      commonStore.setDoSetAttributes(currResourse);
    };

    setSetActionModal(
      <SetActionModal
        title={'scene.SET_ELEMENT_ACTION'}
        onCancel={handleCancel}
        onOk={handleOk}
        action={attrData?.action!}
      />
    );
  };

  return (
    <BlockWrapper
      onMouseEnter={() => setShowAction(true)}
      onMouseLeave={() => setShowAction(false)}
    >
      <StyledHeading fontSize={'16px'}>{attrData.name}px</StyledHeading>
      {resourceView}
      {chooseResourceModal}
      {setActionModal}
      <ActionWrapper style={{ visibility: showAction ? 'visible' : 'hidden' }}>
        <Space direction="vertical">
          <Tooltip title={t('shared.EDIT')}>
            <Button
              shape="circle"
              icon={<EditOutlined />}
              size="small"
              onClick={() => showChooseResourceModal()}
            />
          </Tooltip>
          <Tooltip title={t('shared.ACTION')}>
            <Button
              shape="circle"
              icon={<ThunderboltOutlined />}
              size="small"
              onClick={() => showSetActionModal()}
            />
          </Tooltip>
        </Space>
      </ActionWrapper>
    </BlockWrapper>
  );
};

export default React.memo(ElementItemBasic);
