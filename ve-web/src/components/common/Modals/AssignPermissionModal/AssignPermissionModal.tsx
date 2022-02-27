import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Modal, Checkbox, Divider, message, Space } from 'antd';
import { useCmsStores } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { IPermission } from '@/interfaces';
import { commonHelpers } from '@/helpers';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PerfectScrollbar from 'react-perfect-scrollbar';

interface AssignPermissionModalProps {
  currentPermissions: IPermission[];
  roleId: number;
  onOk: () => void;
  onCancel: () => void;
}

interface ICbPermission extends IPermission {
  checked: boolean;
}

const AssignPermissionModal: React.FC<AssignPermissionModalProps> = observer(
  ({ currentPermissions, roleId, onOk, onCancel }) => {
    const { t } = useTranslation();
    const { roleStore, commonStore } = useCmsStores();
    const [visible, setVisible] = useState<boolean>(true);
    const [cbPermissions, setCbPermissions] = useState<ICbPermission[]>([]);
    const [checkedPermissions, setCheckedPermissions] = useState<number>();
    const [indeterminate, setIndeterminate] = useState<boolean>();
    const [isCheckAll, setIsCheckAll] = useState<boolean>();

    useEffect(() => {
      commonStore.fetchExtraData(['permissions']);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      setCbPermissions(
        commonStore.allPermissions.map(item => ({
          ...item,
          checked: currentPermissions.map(ele => ele.id).includes(item.id),
        }))
      );
    }, [commonStore.allPermissions, currentPermissions]);

    useEffect(() => {
      const isCheckAll = cbPermissions.every(item => item.checked);
      setIsCheckAll(isCheckAll);
      setIndeterminate(
        !cbPermissions.every(item => !item.checked) && !isCheckAll
      );
      setCheckedPermissions(cbPermissions.filter(item => item.checked).length);
    }, [cbPermissions]);

    const handleChange = (id: number, newChecked: boolean) => {
      setCbPermissions(
        cbPermissions.map(item => ({
          ...item,
          checked: item.id === id ? newChecked : item.checked,
        }))
      );
    };

    const handleCheckAll = (newChecked: boolean) => {
      setCbPermissions(
        cbPermissions.map(item => ({
          ...item,
          checked: newChecked,
        }))
      );
    };

    const handleOk = async () => {
      const permissionIds = cbPermissions
        .filter(item => item.checked)
        .map(item => item.id!);
      const res = await roleStore.assignPermissions(roleId, permissionIds);
      if (res && !roleStore.error) {
        message.success(t('role.ASSIGN_PERMISSION_SUCCESSFULLY'));
        onOk();
        handleCancel();
      }
    };

    const handleCancel = () => {
      setVisible(false);
      commonHelpers.delay(300).then(() => onCancel());
    };

    return (
      <Modal
        visible={visible}
        title={t('role.ASSIGN_PERMISSION')}
        okButtonProps={{ loading: roleStore.isLoading }}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        {commonStore.extraDataLoading ? (
          <LoadingSpinner type={'section'} />
        ) : (
          <>
            <Checkbox
              checked={isCheckAll}
              indeterminate={indeterminate}
              onChange={e => handleCheckAll(e.target.checked)}
            >
              <Space>
                {`${checkedPermissions} / ${cbPermissions.length}`}
                {t('permission.PERMISSION')}
              </Space>
            </Checkbox>
            <Divider style={{ marginTop: 8, marginBottom: 5 }} />
            <PerfectScrollbar style={{ height: 400 }}>
              {cbPermissions.map(item => (
                <Checkbox
                  checked={item.checked}
                  style={{ display: 'block', marginLeft: 0, marginTop: 8 }}
                  key={item.id}
                  onChange={e => {
                    handleChange(item.id!, e.target.checked);
                  }}
                >
                  {item.name} - {item.code}
                </Checkbox>
              ))}
            </PerfectScrollbar>
          </>
        )}
      </Modal>
    );
  }
);

export default AssignPermissionModal;
