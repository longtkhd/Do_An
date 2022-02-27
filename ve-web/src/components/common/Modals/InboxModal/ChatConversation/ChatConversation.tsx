import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { IChatConversation } from '@/interfaces';
import {
  DescriptionMessage,
  MessageTimeAgo,
  ListItem,
  NameMessage,
} from './CustomStyled';
import { List, notification, Button } from 'antd';
import { useCommonStores } from '@/hooks';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Avatar from 'react-avatar';
import moment from 'moment';
import { configConstants } from '@/constants';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const ChatConversation = observer(() => {
  const { chatStore, authStore } = useCommonStores();

  const [limit, setLimit] = useState<number>(200);

  useEffect(() => {
    fetchConversations(limit);
    chatStore.listenEvent('FETCH_CONVERSATIONS', (data: any) => {
      chatStore.setConversations(data.chatConversations);
    });
    return () => {
      chatStore.stopEvent('FETCH_CONVERSATIONS');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  useEffect(() => {
    chatStore.listenEvent('TRIGGER_FETCH_CONVERSATIONS', () => {
      fetchConversations(limit + 1);
      setLimit(origin => origin + 1);
    });
    return () => {
      chatStore.stopEvent('TRIGGER_FETCH_CONVERSATIONS');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  useEffect(() => {
    chatStore.listenEvent('UPDATE_CONVERSATION', (data: any) => {
      const { message, conversationId } = data;
      const conversation = chatStore.conversations.find(
        c => c.id === conversationId
      );
      if (conversation) {
        conversation.lastMessage = message;
        if (
          !chatStore.currentConversation ||
          conversationId !== chatStore.currentConversation.id
        ) {
          conversation.notificationUser = true;
          chatStore.sendEvent('ADD_MESSAGE_NOTIFICATION', {
            portal: configConstants.appPortals.MAINSITE,
            conversationId,
          });
        }

        let newConversations = cloneDeep(chatStore.conversations);
        newConversations.splice(
          chatStore.conversations.findIndex(c => c.id === conversationId),
          1,
          conversation
        );
        newConversations = newConversations.sort(
          (a, b) =>
            new Date(b?.lastMessage?.createdAt).getTime() -
            new Date(a?.lastMessage?.createdAt).getTime()
        );
        chatStore.setConversations(newConversations);

        if (!chatStore.currentConversation) {
          const notificationClick = () => {
            chatStore.setCurrentConversation(conversation);
            notification.close(key);

            const newConversations = cloneDeep(chatStore.conversations);
            const newConversation = newConversations.find(
              c => c.id === conversation.id
            );
            newConversation!.notificationUser = false;
            newConversations.splice(
              chatStore.conversations.findIndex(c => c.id === conversationId),
              1,
              newConversation!
            );

            chatStore.setConversations(newConversations);

            const payload = {
              conversationId: conversation.id,
              userId: authStore.userInfo?.id,
              portal: configConstants.appPortals.MAINSITE,
            };
            chatStore.setVisibleInboxModal(true);
            chatStore.sendEvent('JOIN_ROOM', payload);
          };

          const key = uuidv4();
          notification.open({
            message: `Message from: ${conversation?.booth?.name}`,
            description: conversation.lastMessage.message,
            icon: (
              <Avatar
                style={{ marginRight: '8px' }}
                name={conversation?.booth?.name}
                src={`${configConstants.ASSETS_URL}/booths/${conversation?.booth?.id}/${conversation?.booth?.avatar}`}
                size="40"
                round={true}
              />
            ),
            btn: (
              <Button
                type="primary"
                size="small"
                onClick={() => notificationClick()}
              >
                View Message
              </Button>
            ),
            key,
          });
        }
      }
    });
    return () => {
      chatStore.stopEvent('UPDATE_CONVERSATION');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatStore.conversations, chatStore.currentConversation]);

  const fetchConversations = (limit: number) => {
    const payload = { userId: authStore.userInfo?.id, limit };
    chatStore.sendEvent('FETCH_CONVERSATIONS', payload);
  };

  const fromNow = (date: Date) => {
    return moment(date).fromNow();
  };

  const setConversation = (conversation: IChatConversation) => {
    chatStore.setCurrentConversation(conversation);
    const newConversations = chatStore.conversations.map(item => ({
      ...item,
      notificationUser:
        item.id === conversation.id ? false : item.notificationUser,
    }));
    chatStore.setConversations(newConversations);
    const payload = {
      conversationId: conversation.id,
      portal: configConstants.appPortals.MAINSITE,
    };
    chatStore.sendEvent('JOIN_ROOM', payload);
  };

  return (
    <PerfectScrollbar style={{ height: 400 }}>
      <List
        itemLayout="horizontal"
        dataSource={chatStore.conversations}
        renderItem={item => (
          <ListItem
            selected={item.id === chatStore.currentConversation?.id}
            extra={
              <MessageTimeAgo>
                {item.lastMessage ? fromNow(item.lastMessage?.createdAt) : ''}
              </MessageTimeAgo>
            }
            onClick={() => setConversation(item)}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  round={true}
                  size="40"
                  name={item.booth.name}
                  src={`${configConstants.ASSETS_URL}/booths/${item.booth.id}/${item.booth.avatar}`}
                />
              }
              title={
                <NameMessage readed={item.notificationUser}>
                  {item.booth.name}
                </NameMessage>
              }
              description={
                <DescriptionMessage readed={item.notificationUser}>
                  {item.lastMessage?.message}
                </DescriptionMessage>
              }
            />
          </ListItem>
        )}
      />
    </PerfectScrollbar>
  );
});

export default ChatConversation;
