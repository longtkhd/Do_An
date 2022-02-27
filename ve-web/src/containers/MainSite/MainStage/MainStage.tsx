import { configConstants } from '@/constants';
import { useCommonStores, useMainSiteStores } from '@/hooks';
import { IStage } from '@/interfaces';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { MainstageContainer } from './CustomStyled';
import Banner from './Banner';
import Screen from './Screen';
import { commonHelpers } from '@/helpers';

interface ParamTypes {
  id: string;
}

const MainStage = () => {
  const { stageStore } = useMainSiteStores();
  const { authStore, chatStore } = useCommonStores();
  const history = useHistory();
  const { id: stageId } = useParams<ParamTypes>();
  const [stage, setStage] = useState<IStage>({} as IStage);
  const [startTrackTime, setStartTrackTime] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await stageStore.getStage(+stageId);
      if (res && !stageStore.error) {
        const stage = res.stage;
        const bannerLeft = stage.assets.find(
          (o: any) => o.key === 'bannerLeftUrl'
        );
        const bannerRight = stage.assets.find(
          (o: any) => o.key === 'bannerRightUrl'
        );
        const background = stage.assets.find(
          (o: any) => o.key === 'background'
        );
        const centreScreen = stage.assets.find(
          (o: any) => o.key === 'centreScreenUrl'
        );
        setStage({
          ...stage,
          bannerLeft:
            bannerLeft?.value &&
            `${configConstants.ASSETS_URL}/assets/${bannerLeft.id}/${bannerLeft.value}`,
          bannerRight:
            bannerRight?.value &&
            `${configConstants.ASSETS_URL}/assets/${bannerRight.id}/${bannerRight.value}`,
          background:
            background?.value &&
            `${configConstants.ASSETS_URL}/assets/${background.id}/${background.value}`,
          centreScreen:
            centreScreen?.value &&
            `${configConstants.ASSETS_URL}/assets/${centreScreen.id}/${centreScreen.value}`,
        });
        console.log(stage);
      } else {
        history.push('/cms/pages/stages');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageId]);

  useEffect(() => {
    const a = new Date().getTime();
    if (!startTrackTime) {
      setStartTrackTime(a);
    }
    return () => {
      if (startTrackTime) {
        chatStore.sendEvent('ADD_TIMER_COLLECTOR', {
          count: new Date().getTime() - startTrackTime,
          userId: authStore.userInfo?.id,
          stageId: stageId,
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTrackTime]);

  useEffect(() => {
    const payload = {
      userId: authStore.userInfo?.id,
      stageId: stageId,
      device: commonHelpers.isMobile() ? 'MOBILE' : 'BROWSER',
    };
    chatStore.sendEvent('VISIT', payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainstageContainer background={(stage as any).background}>
      <Banner
        position="left"
        url={stage.bannerLeftUrl!}
        src={stage.bannerLeft!}
        stage={stage}
        collectorType="leftBanner"
        collectorName="Left Banner"
      />
      <Screen
        stage={stage}
        collectorType="screen"
        collectorName="Screen"
        type={stage.type!}
      />
      <Banner
        position="right"
        url={stage.bannerRightUrl!}
        src={stage.bannerRight!}
        stage={stage}
        collectorType="rightBanner"
        collectorName="Right Banner"
      />
    </MainstageContainer>
  );
};

export default MainStage;
