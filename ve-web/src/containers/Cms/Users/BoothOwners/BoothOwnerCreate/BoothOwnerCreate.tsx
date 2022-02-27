import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useCmsStores, useCommonStores } from '@/hooks';
import { useHistory } from 'react-router-dom';
import { IUser } from '@/interfaces';
import { message } from 'antd';
import BoothOwnerForm from '../BoothOwnerForm';
import { configConstants } from '@/constants';

const BoothOwnerCreate: React.FC = observer(() => {
  const { t } = useTranslation();
  const { userStore } = useCmsStores();
  const { authStore } = useCommonStores();
  const history = useHistory();
  const user: IUser = {
    status: 'ACTIVE',
  } as IUser;
  const onSave = async (data: IUser) => {
    const res = await userStore.createUser({
      ...data,
      roleId: configConstants.roles.BOOTH_OWNER,
      organizerId: authStore.userInfo?.organizerId!,
    });
    if (res && !userStore.error) {
      message.success(t('user.CREATE_BOOTH_OWNER_SUCCESSFULLY'));
      history.push('/cms/users/booth-owners');
    }
  };
  return <BoothOwnerForm user={user} onSave={onSave} />;
});

export default BoothOwnerCreate;
