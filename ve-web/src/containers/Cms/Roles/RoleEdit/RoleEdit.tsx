import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { IRole } from '@/interfaces';
import { useHistory, useParams } from 'react-router-dom';
import { useCmsStores } from '@/hooks';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import RoleForm from '../RoleForm';

interface ParamTypes {
  id: string;
}

const RoleEdit: React.FC = observer(() => {
  const { t } = useTranslation();
  const { roleStore } = useCmsStores();
  const history = useHistory();
  const { id: roleId } = useParams<ParamTypes>();
  const [role, setRole] = useState<IRole>({} as IRole);

  useEffect(() => {
    const fetchData = async () => {
      const res = await roleStore.getRole(+roleId);
      if (res && !roleStore.error) {
        setRole(res.role);
      } else {
        history.push('/cms/roles/list');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId]);

  const onSave = async (data: IRole) => {
    const res = await roleStore.updateRole(role.id!, data);
    if (res && !roleStore.error) {
      message.success(t('role.UPDATE_ROLE_SUCCESSFULLY'));
      history.push('/cms/roles/list');
    }
  };

  return <RoleForm mode="EDIT" role={role} onSave={onSave} />;
});

export default RoleEdit;
