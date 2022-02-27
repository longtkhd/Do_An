import React from 'react';
import { IStage } from '@/interfaces';
import { BannerContainer } from './CustomStyled';
import { useCommonStores } from '@/hooks';
interface BannerProps {
  url: string;
  src: string;
  collectorType: string;
  collectorName: string;
  stage: IStage;
  position: string;
}

const Banner: React.FC<BannerProps> = ({
  url,
  src,
  collectorType,
  collectorName,
  stage,
  position,
}) => {
  const { authStore, chatStore } = useCommonStores();

  const handleCollector = () => {
    chatStore.sendEvent('ADD_CLICK_COLLECTOR', {
      type: collectorType,
      name: collectorName,
      userId: authStore.userInfo?.id,
      stageId: stage.id,
    });
  };

  return (
    <BannerContainer position={position} onClick={() => handleCollector()}>
      <a href={url} className="link" target="_blank" rel="noopener noreferrer">
        <img className="image" src={src || ''} alt="" />
      </a>
    </BannerContainer>
  );
};

export default Banner;
