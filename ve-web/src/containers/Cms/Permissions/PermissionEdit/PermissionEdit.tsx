import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { IPermission } from '@/interfaces';
import { useHistory, useParams } from 'react-router-dom';
import { useCmsStores } from '@/hooks';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import PermissionForm from '../PermissionForm';

interface ParamTypes {
  id: string;
}

const PermissionEdit: React.FC = observer(() => {
  const { t } = useTranslation();
  const [permission, setPermission] = useState<IPermission>({} as IPermission);
  const { permissionStore } = useCmsStores();
  const history = useHistory();
  const { id: permissionId } = useParams<ParamTypes>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await permissionStore.getPermission(+permissionId);
      if (res && !permissionStore.error) {
        setPermission(res.permission);
      } else {
        history.push('/cms/permissions/list');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionId]);

  const onSave = async (data: IPermission) => {
    const res = await permissionStore.updatePermission(permission.id!, data);
    if (res && !permissionStore.error) {
      message.success(t('permission.UPDATE_PERMISSION_SUCCESSFULLY'));
      history.push('/cms/permissions/list');
    }
  };

  return <PermissionForm mode="EDIT" permission={permission} onSave={onSave} />;
});

export default PermissionEdit;
