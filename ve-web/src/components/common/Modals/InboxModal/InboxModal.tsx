import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Row, Col } from 'antd';
import {
  LeftHeader,
  RightHeader,
  LeftBody,
  RightBody,
  NoneSelectConversation,
  BackMobileChat,
} from './CustomStyled';
import { useCommonStores } from '@/hooks';
import { configConstants } from '@/constants';
import ChatArea from '@/components/common/ChatArea';
import ChatConversation from './ChatConversation';
import Avatar from 'react-avatar';
import { useMediaQuery } from 'react-responsive';
import { LeftOutlined } from '@ant-design/icons';

const InboxModal = observer(() => {
  const { chatStore } = useCommonStores();
  const isMobile = useMediaQuery({
    query: '(max-device-width: 767px)',
  });

  const onCancel = () => {
    chatStore.setVisibleInboxModal(false);
    chatStore.setCurrentConversation(null);
  };

  const backConversation = () => {
    chatStore.setCurrentConversation(null);
  };

  return (
    <Modal
      visible={chatStore.visibleInboxModal}
      forceRender={true}
      onCancel={() => onCancel()}
      width={1000}
      wrapClassName="inbox-modal"
      footer={null}
      bodyStyle={{
        padding: 0,
      }}
      title={
        <Row>
          {((isMobile && !chatStore.currentConversation) || !isMobile) && (
            <Col xs={24} md={8}>
              <LeftHeader>INBOX</LeftHeader>
            </Col>
          )}
          <Col xs={24} md={16}>
            {chatStore.currentConversation && (
              <RightHeader>
                {isMobile && (
                  <BackMobileChat onClick={backConversation}>
                    <LeftOutlined />
                  </BackMobileChat>
                )}
                <Avatar
                  style={{ marginRight: '8px' }}
                  name={chatStore.currentConversation?.booth.name}
                  src={`${configConstants.ASSETS_URL}/booths/${chatStore.currentConversation?.booth.id}/${chatStore.currentConversation?.booth.avatar}`}
                  size="40"
                  round={true}
                />{' '}
                {chatStore.currentConversation?.booth.name}
              </RightHeader>
            )}
          </Col>
        </Row>
      }
    >
      <Row>
        {((isMobile && !chatStore.currentConversation) || !isMobile) && (
          <Col xs={24} md={8}>
            <LeftBody>
              <ChatConversation />
            </LeftBody>
          </Col>
        )}
        <Col xs={24} md={16}>
          <RightBody>
            {chatStore.currentConversation ? (
              <ChatArea portal={configConstants.appPortals.MAINSITE} />
            ) : (
              !isMobile && (
                <NoneSelectConversation>
                  Please select a conversation
                </NoneSelectConversation>
              )
            )}
          </RightBody>
        </Col>
      </Row>
    </Modal>
  );
});

export default InboxModal;
