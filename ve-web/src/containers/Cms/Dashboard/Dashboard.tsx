import React from 'react';
import { observer } from 'mobx-react';
import DashboardBoothOwner from './DashboardBoothOwner';
import DashboardOrganizer from './DashboardOrganizer';
import { useCommonStores } from '@/hooks';

const Dashboard: React.FC = observer(() => {
  const { authStore } = useCommonStores();
  if (authStore.userInfo?.boothId) {
    return <DashboardBoothOwner />;
  } else {
    return <DashboardOrganizer />;
  }
});

export default Dashboard;
