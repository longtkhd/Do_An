import React from 'react';
import { observer } from 'mobx-react';
import SharedBasics from '../../Shared/Basics';
import { useCommonStores } from '@/hooks';

const Basics: React.FC = observer(() => {
  const { authStore } = useCommonStores();
  return <SharedBasics boothId={authStore.userInfo?.organizer.boothId!} />;
});

export default Basics;
