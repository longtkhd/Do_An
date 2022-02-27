import React, { useState } from 'react';
import { Tooltip, Image, Space } from 'antd';
import { EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { configConstants } from '@/constants';
import { IAsset } from '@/interfaces';
import { useTranslation } from 'react-i18next';
import { ResourceWrapper, ResourceActions } from './CustomStyled';
import { commonHelpers } from '@/helpers';

interface ResourceProps {
  item: IAsset;
  selected: boolean;
  setSelectedResourse: (data: IAsset) => void;
}

const Resource: React.FC<ResourceProps> = ({
  item,
  selected,
  setSelectedResourse,
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);

  const handlePreview = () => {
    setVisible(true);
  };

  const handleChoose = () => {
    setSelectedResourse(item);
  };

  const onVisibleChange = (visible: boolean) => {
    if (!visible) {
      setVisible(visible);
    }
  };

  const renderResourse = () => {
    const value = `${configConstants.ASSETS_URL}/assets/${item.id}/${item.value}`;
    if (commonHelpers.isVideo(value)) {
      return (
        <video
          crossOrigin="anonymous"
          autoPlay={false}
          loop
          muted
          playsInline
          controls
        >
          <source
            src={value}
            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2'
          />
        </video>
      );
    }
    return (
      <Image
        src={value}
        placeholder={true}
        fallback={require('@/assets/images/noimage-thumb.png')}
        preview={{
          visible,
          onVisibleChange,
        }}
      />
    );
  };

  return (
    <Tooltip placement="bottom" title={item?.name}>
      <ResourceWrapper selected={selected} onClick={handleChoose}>
        {renderResourse()}
        <ResourceActions className="actions">
          <Space size="middle">
            {!commonHelpers.isVideo(item.value) && (
              <Tooltip title={t('shared.PREVIEW')}>
                <EyeOutlined onClick={handlePreview} />
              </Tooltip>
            )}
            <Tooltip title={t('shared.CHOOSE')}>
              <CheckCircleOutlined onClick={handleChoose} />
            </Tooltip>
          </Space>
        </ResourceActions>
      </ResourceWrapper>
    </Tooltip>
  );
};

export default Resource;
