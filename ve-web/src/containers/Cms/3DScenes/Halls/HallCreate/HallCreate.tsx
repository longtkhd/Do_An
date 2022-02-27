import React from 'react';
import { useCmsStores } from '@/hooks';
import { IHall } from '@/interfaces';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import HallForm from '../HallForm';

const HallCreate: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { hallStore } = useCmsStores();
  const hall: IHall = {
    name: '',
    status: 'ACTIVE',
  } as IHall;

  const onSave = async (data: FormData) => {
    const res = await hallStore.createHall(data);
    if (res && !hallStore.error) {
      message.success(t('role.CREATE_HALL_SUCCESSFULLY'));
      history.push('/cms/pages/halls');
    }
  };

  return <HallForm hall={hall} onSave={onSave} />;
};

export default HallCreate;
