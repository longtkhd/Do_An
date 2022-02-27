import React from 'react';
import { observer } from 'mobx-react';
import SharedChat from '../../Shared/Chat';
import { useCommonStores } from '@/hooks';

interface ChatProps {
  boothId: number;
}

const Chat: React.FC<ChatProps> = observer(() => {
  const { authStore } = useCommonStores();
  return <SharedChat boothId={authStore.userInfo?.boothId!}></SharedChat>;
});

export default Chat;
