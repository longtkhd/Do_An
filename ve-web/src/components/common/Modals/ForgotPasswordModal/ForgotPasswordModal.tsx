import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Modal } from 'antd';
import { commonHelpers } from '@/helpers';

interface ForgotPasswordModalProps {
  onOk: () => void;
  onCancel: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = observer(
  ({ onCancel }) => {
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
      ></Modal>
    );
  }
);

export default ForgotPasswordModal;
