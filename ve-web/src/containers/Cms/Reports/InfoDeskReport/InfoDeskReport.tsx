import { useCommonStores } from '@/hooks';
import { observer } from 'mobx-react';
import React from 'react';
import Report from '../shared/Report';

const InfoDeskReport = observer(() => {
  const { authStore } = useCommonStores();

  return (
    <Report
      sceneIdKey={'infoDeskId'}
      sceneId={authStore.userInfo?.organizer.infoDeskId!}
      title={'InfoDesk'}
    />
  );
});

export default InfoDeskReport;
