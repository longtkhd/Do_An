import { useCmsStores } from '@/hooks';
import { IHall } from '@/interfaces';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Space } from 'antd';
import Report from '../shared/Report';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { observer } from 'mobx-react';

const HallReport = observer(() => {
  const { hallStore } = useCmsStores();
  const [halls, setHalls] = useState<IHall[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const res = await hallStore.getAllHalls();
      if (res && !hallStore.error) {
        const { halls } = res;
        setHalls(halls);
      } else {
        history.push('/cms/dashboard');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {hallStore.isLoading ? (
        <LoadingSpinner type={'section'} />
      ) : (
        halls.map(hall => (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Report
              key={hall.name}
              sceneIdKey={'hallId'}
              sceneId={hall.id!}
              title={hall.name}
            />
          </Space>
        ))
      )}
    </>
  );
});

export default HallReport;
