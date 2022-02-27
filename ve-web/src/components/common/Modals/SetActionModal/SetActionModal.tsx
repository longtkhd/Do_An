import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Modal, Select, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { commonHelpers } from '@/helpers';
import { IAction } from '@/interfaces';
import { LinkOutlined } from '@ant-design/icons';
import { configConstants } from '@/constants';

interface SetActionModalProps {
  title: string;
  action: IAction;
  onOk: (action: IAction) => void;
  onCancel: () => void;
}

const { Option } = Select;

const SetActionModal: React.FC<SetActionModalProps> = observer(
  ({ action, title, onOk, onCancel }) => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState<boolean>(true);
    const [outAction, setOutAction] = useState<IAction>(
      action ? action : { type: configConstants.elementActions.POPUP }
    );

    const handleOk = async () => {
      onOk(outAction);
      handleCancel();
    };

    const handleCancel = () => {
      setVisible(false);
      commonHelpers.delay(300).then(() => onCancel());
    };

    return (
      <Modal
        visible={visible}
        title={t(title)}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <Select
          defaultValue={action.type}
          style={{ marginBottom: 24, width: '100%' }}
          onChange={value => {
            setOutAction({
              ...outAction,
              type: value,
            });
          }}
        >
          <Option value={configConstants.elementActions.POPUP}>
            Open image popup
          </Option>
          <Option value={configConstants.elementActions.NEWLINK}>
            Open link in new tab
          </Option>
        </Select>
        {outAction.type === configConstants.elementActions.NEWLINK && (
          <Input
            allowClear
            placeholder="Enter your url"
            prefix={<LinkOutlined />}
            onChange={e => {
              setOutAction({
                ...outAction,
                url: e.target.value,
              });
            }}
            defaultValue={outAction.url}
          />
        )}
      </Modal>
    );
  }
);

export default SetActionModal;
