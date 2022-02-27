import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { IHall } from '@/interfaces';
import { useHistory, useParams } from 'react-router-dom';
import { useCmsStores } from '@/hooks';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import HallForm from '../HallForm';

interface ParamTypes {
  id: string;
}

const HallEdit: React.FC = observer(() => {
  const { t } = useTranslation();
  const { id: hallId } = useParams<ParamTypes>();
  const { hallStore } = useCmsStores();
  const history = useHistory();
  const [hall, setHall] = useState<IHall>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await hallStore.getHall(+hallId);
      if (res && !hallStore.error) {
        setHall(res.hall);
      } else {
        history.push('/cms/pages/halls');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hallId]);

  const onSave = async (data: FormData) => {
    const res = await hallStore.updateHall(hall?.id!, data);
    if (res && !hallStore.error) {
      message.success(t('hall.UPDATE_HALL_SUCCESSFULLY'));
      history.push('/cms/pages/halls');
    }
  };
  return <HallForm mode="EDIT" hall={hall} onSave={onSave} />;
});

export default HallEdit;
