import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Modal, Button, Space } from 'antd';
import { commonHelpers } from '@/helpers';
import { useMainSiteStores } from '@/hooks';
import { WelcomeWrapper } from './CustomStyled';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

interface WelcomeModalProps {
  onOk?: () => void;
  onCancel: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = observer(({ onCancel }) => {
  const { commonStore } = useMainSiteStores();
  const [visible, setVisible] = useState<boolean>(true);

  const handleOk = async () => {};

  const handleCancel = () => {
    setVisible(false);
    commonHelpers.delay(300).then(() => onCancel());
  };

  return (
    <Modal
      visible={visible}
      onOk={() => handleOk()}
      onCancel={() => handleCancel()}
      width={780}
      title={commonStore.lobby?.welcomeMsgTitle}
      className="welcome-modal"
      footer={
        <Space>
          <Link to={`/booth/${commonStore.organizer?.infoDeskId}`}>
            <Button type="primary" shape="round" size="large">
              {commonStore.lobby?.infoBoothButton}
            </Button>
          </Link>
          <Link to={`/booth/${commonStore.organizer?.boothId}`}>
            <Button type="default" shape="round" size="large">
              {commonStore.lobby?.organizerBoothButton}
            </Button>
          </Link>
        </Space>
      }
    >
      <WelcomeWrapper>
        <Markdown>{commonStore.lobby?.welcomeMsg ?? ''}</Markdown>
      </WelcomeWrapper>
    </Modal>
  );
});

export default WelcomeModal;
