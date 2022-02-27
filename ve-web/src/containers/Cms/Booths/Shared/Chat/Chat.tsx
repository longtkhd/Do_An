import React, { useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { observer } from 'mobx-react';
import ChatConversation from './ChatConversation';
import { useCommonStores } from '@/hooks';
import { IUser } from '@/interfaces';
import {
  LeftHeader,
  RightHeader,
  LeftBody,
  RightBody,
  NoneSelectConversation,
} from './CustomStyled';
import { configConstants } from '@/constants';
import Avatar from 'react-avatar';
import ChatArea from '@/components/common/ChatArea';

interface ChatProps {
  boothId: number;
}

const Chat: React.FC<ChatProps> = observer(({ boothId }) => {
  const { chatStore } = useCommonStores();

  useEffect(() => {
    return () => {
      chatStore.setCurrentConversation(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFullName = (user: IUser) => {
    return (user.firstName || '') + ' ' + (user.lastName || '');
  };

  return (
    <Card
      title={
        <Row>
          <Col xs={24} md={8}>
            <LeftHeader>INBOX</LeftHeader>
          </Col>
          <Col xs={24} md={16}>
            {chatStore.currentConversation && (
              <RightHeader>
                <Avatar
                  style={{ marginRight: '8px' }}
                  name={getFullName(chatStore.currentConversation?.user)}
                  src={`${configConstants.ASSETS_URL}/users/${chatStore.currentConversation?.user.id}/${chatStore.currentConversation?.user.avatar}`}
                  size="40"
                  round={true}
                />{' '}
                {getFullName(chatStore.currentConversation?.user)}
              </RightHeader>
            )}
          </Col>
        </Row>
      }
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
      headStyle={{
        padding: 0,
      }}
      className="inbox-cms"
    >
      <Row>
        <Col xs={24} md={8}>
          <LeftBody>
            <ChatConversation boothId={boothId} />
          </LeftBody>
        </Col>
        <Col xs={24} md={16}>
          <RightBody>
            {chatStore.currentConversation ? (
              <ChatArea portal={configConstants.appPortals.CMS} />
            ) : (
              <NoneSelectConversation>
                Please select a conversation
              </NoneSelectConversation>
            )}
          </RightBody>
        </Col>
      </Row>
    </Card>
  );
});

export default Chat;
