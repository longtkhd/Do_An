import React from 'react';
import { observer } from 'mobx-react';
import SharedResourceHub from '../../Shared/ResourceHub';
import { useCommonStores } from '@/hooks';

interface ResourceHubProps {
  boothId: number;
}

const ResourceHub: React.FC<ResourceHubProps> = observer(() => {
  const { authStore } = useCommonStores();
  return (
    <SharedResourceHub
      boothId={authStore.userInfo?.organizer.boothId!}
    ></SharedResourceHub>
  );
});

export default ResourceHub;
