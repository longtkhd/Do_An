import { useCommonStores } from '@/hooks';
import { observer } from 'mobx-react';
import React from 'react';
import Report from '../shared/Report';

const OrganizerBoothReport = observer(() => {
  const { authStore } = useCommonStores();

  return (
    <Report
      sceneIdKey={'boothId'}
      sceneId={authStore.userInfo?.organizer.boothId!}
      title={'Organizer Booth'}
    />
  );
});

export default OrganizerBoothReport;
