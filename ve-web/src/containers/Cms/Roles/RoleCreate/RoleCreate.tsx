import React from 'react';
import { observer } from 'mobx-react';
import { IRole } from '@/interfaces';
import { useCmsStores } from '@/hooks';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RoleForm from '../RoleForm';

const RoleCreate: React.FC = observer(() => {
  const { t } = useTranslation();
  const { roleStore } = useCmsStores();
  const history = useHistory();
  const role: IRole = {
    name: '',
    status: 'ACTIVE',
  };
  const onSave = async (data: IRole) => {
    const res = await roleStore.createRole(data);
    if (res && !roleStore.error) {
      message.success(t('role.CREATE_ROLE_SUCCESSFULLY'));
      history.push('/cms/roles/list');
    }
  };
  return <RoleForm role={role} onSave={onSave} />;
});

export default RoleCreate;
