import React from 'react';
import { observer } from 'mobx-react';
import { IPermission } from '@/interfaces';
import { useCmsStores } from '@/hooks';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PermissionForm from '../PermissionForm';

const PermissionCreate: React.FC = observer(() => {
  const { t } = useTranslation();
  const { permissionStore } = useCmsStores();
  const history = useHistory();
  const permission: IPermission = {
    name: '',
    status: 'ACTIVE',
  };
  const onSave = async (data: IPermission) => {
    const res = await permissionStore.createPermission(data);
    if (res && !permissionStore.error) {
      message.success(t('permission.CREATE_PERMISSION_SUCCESSFULLY'));
      history.push('/cms/permissions/list');
    }
  };
  return <PermissionForm permission={permission} onSave={onSave} />;
});

export default PermissionCreate;
