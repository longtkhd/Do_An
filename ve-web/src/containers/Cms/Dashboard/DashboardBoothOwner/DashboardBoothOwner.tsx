import { useCommonStores } from '@/hooks';
import { observer } from 'mobx-react';
import React from 'react';
import Report from '../../Reports/shared/Report';

const DashboardBoothOwner = observer(() => {
  const { authStore } = useCommonStores();
  return (
    <Report
      sceneIdKey={'boothId'}
      sceneId={authStore.userInfo?.boothId!}
      title={'Booth'}
    />
  );
});

export default DashboardBoothOwner;
