import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { IUser } from '@/interfaces';
import { useHistory, useParams } from 'react-router-dom';
import { useCmsStores } from '@/hooks';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import OrganizerForm from '../OrganizerForm';

interface ParamTypes {
  id: string;
}

const OrganizerEdit: React.FC = observer(() => {
  const { t } = useTranslation();
  const { userStore } = useCmsStores();
  const history = useHistory();
  const { id: userId } = useParams<ParamTypes>();
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    const fetchData = async () => {
      const res = await userStore.getUser(+userId);
      if (res && !userStore.error) {
        setUser(res.user);
      } else {
        history.push('/cms/users/organizers');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const onSave = async (data: IUser) => {
    const res = await userStore.updateUser(user.id!, data);
    if (res && !userStore.error) {
      message.success(t('user.UPDATE_ORGANIZER_SUCCESSFULLY'));
      history.push('/cms/users/organizers');
    }
  };

  return <OrganizerForm mode="EDIT" user={user} onSave={onSave} />;
});

export default OrganizerEdit;
