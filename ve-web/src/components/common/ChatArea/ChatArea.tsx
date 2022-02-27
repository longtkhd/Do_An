import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { IChatMessage, IUser } from '@/interfaces';
import { useCommonStores } from '@/hooks';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { configConstants } from '@/constants';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import InputArea from './InputArea';
import MessageSent from './MessageSent';
import MessageReceived from './MessageReceived';
import TimeDivider from './TimeDivider';
import moment from 'moment';

interface ChatAreaProps {
  portal: string;
}

const ChatArea: React.FC<ChatAreaProps> = observer(({ portal }) => {
  const { chatStore, authStore } = useCommonStores();
  const chatMessageRef = useRef<any>(null);
  const [limit, setLimit] = useState(10);
  const [fileList, setFileList] = useState<any[]>([]);
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [totalMessages, setTotalMessages] = useState<number>();
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(true);

  useEffect(() => {
    if (chatStore.currentConversation) {
      fetchMessages(chatStore.currentConversation.id!, limit);
      setIsFirstLoad(true);
    }
    chatStore.listenEvent('FETCH_MESSAGES', (data: any) => {
      const { messages, totalMessages } = data;
      setMessages(messages);
      setTotalMessages(totalMessages);
      setIsLoadingMessages(false);
    });
    chatStore.listenEvent('RECEIVE_MESSAGE', (data: any) => {
      const { conversationId, message } = data;
      if (conversationId === chatStore.currentConversation?.id) {
        addNewMessage(message);
      }
    });
    return () => {
      chatStore.stopEvent('FETCH_MESSAGES');
      chatStore.stopEvent('RECEIVE_MESSAGE');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatStore.currentConversation]);

  useLayoutEffect(() => {
    if (isFirstLoad) {
      scrollToBottom('force');
      setIsFirstLoad(false);
    } else {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const fetchMessages = (conversationId: number, limit: number) => {
    const payload = { conversationId, limit };
    chatStore.sendEvent('FETCH_MESSAGES', payload);
    setIsLoadingMessages(true);
  };

  const updateSendingMessage = (message: IChatMessage) => {
    setMessages(origin => {
      const newMessages = cloneDeep(origin);
      newMessages.splice(
        messages.findIndex(m => m.id === (message as any).tempId),
        1,
        message
      );
      return newMessages;
    });
    scrollToBottom('force');
  };

  const addNewMessage = (message: IChatMessage) => {
    setMessages(origin => [...origin, message]);
    setLimit(origin => origin + 1);
  };

  const scrollToBottom = (option = 'normal') => {
    if (chatMessageRef.current) {
      const scrollAction = chatMessageRef.current._container;
      switch (option) {
        case 'force':
          scrollAction.scrollTop = scrollAction.scrollHeight;
          break;
        default:
          if (
            scrollAction.scrollTop >
            scrollAction.scrollHeight - (scrollAction.offsetHeight + 100)
          ) {
            scrollAction.scrollTop = scrollAction.scrollHeight;
          }
          break;
      }
    }
  };

  const getFullName = (user: IUser) => {
    return (user.firstName || '') + ' ' + (user.lastName || '');
  };

  const handleLoadMore = () => {
    if (!isLoadingMessages) {
      fetchMessages(chatStore.currentConversation?.id!, limit + 10);
      setLimit(origin => origin + 10);
    }
  };

  return (
    <>
      <PerfectScrollbar
        style={{ height: fileList.length ? 350 : 400 }}
        ref={chatMessageRef}
      >
        {totalMessages! > limit && (
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <Button
              icon={<ReloadOutlined />}
              type="dashed"
              onClick={handleLoadMore}
              loading={isLoadingMessages}
            >
              Load More
            </Button>
          </div>
        )}
        {messages &&
          messages.map((message, index) => {
            let time = '';
            let avatar = '';
            let timeDivider = '';
            const type = (message as any).type;
            const src = message.src;
            const size = message.size;
            const preMessage = messages[index - 1]
              ? messages[index - 1]
              : message;
            const nextMessage = messages[index + 1]
              ? messages[index + 1]
              : message;
            const lastMessage = messages[messages.length - 1];
            const firstMessage = messages[0];

            const dividerRenderCondition =
              !moment(message.createdAt).isSame(preMessage.createdAt, 'day') ||
              message.id === firstMessage.id;

            if (dividerRenderCondition) {
              timeDivider = moment(message.createdAt).format('MMM Do YYYY');
            }

            switch (portal) {
              case configConstants.appPortals.CMS:
                avatar = chatStore.currentConversation?.user.avatar
                  ? `${configConstants.ASSETS_URL}/users/${chatStore.currentConversation?.user.id}/${chatStore.currentConversation?.user.avatar}`
                  : getFullName(chatStore.currentConversation?.user!);
                break;
              case configConstants.appPortals.MAINSITE:
                avatar = chatStore.currentConversation?.booth?.avatar
                  ? `${configConstants.ASSETS_URL}/booths/${chatStore.currentConversation?.booth.id}/${chatStore.currentConversation?.booth.avatar}`
                  : chatStore.currentConversation?.booth?.name!;
                break;
              default:
                break;
            }

            const timeRenderCondition =
              moment(message.createdAt).valueOf() -
                moment(preMessage.createdAt).valueOf() >
                300000 ||
              message.userId !== nextMessage.userId ||
              message.id === lastMessage.id;
            if (timeRenderCondition) {
              time = moment(message.createdAt).format('LT');
            }

            const content = message.message;
            const sending = !!(message as any).sending;
            if (message.userId === authStore.userInfo?.id) {
              return (
                <React.Fragment key={uuidv4()}>
                  {timeDivider && <TimeDivider time={timeDivider} />}
                  <MessageSent
                    content={content}
                    time={time}
                    sending={sending}
                    type={type}
                    src={src}
                    size={size}
                  />
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={uuidv4()}>
                  {timeDivider && <TimeDivider time={timeDivider} />}
                  <MessageReceived
                    content={content}
                    time={time}
                    avatar={avatar}
                    type={type}
                    src={src}
                    size={size}
                  />
                </React.Fragment>
              );
            }
          })}
      </PerfectScrollbar>
      <InputArea
        messages={messages}
        fileList={fileList}
        setFileList={setFileList}
        updateSendingMessage={updateSendingMessage}
        addNewMessage={addNewMessage}
        portal={portal}
      />
    </>
  );
});

export default ChatArea;
