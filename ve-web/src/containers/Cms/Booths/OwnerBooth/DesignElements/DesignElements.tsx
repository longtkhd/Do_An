import React from 'react';
import { observer } from 'mobx-react';
import SharedDesignElements from '../../Shared/DesignElements';
import { useCommonStores } from '@/hooks';

const DesignElements: React.FC = observer(() => {
  const { authStore } = useCommonStores();
  return <SharedDesignElements boothId={authStore.userInfo?.boothId!} />;
});

export default DesignElements;
