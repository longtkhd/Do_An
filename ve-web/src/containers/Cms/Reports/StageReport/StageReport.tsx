import { useCmsStores } from '@/hooks';
import { IStage } from '@/interfaces';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Space } from 'antd';
import Report from '../shared/Report';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { observer } from 'mobx-react';

const StageReport = observer(() => {
  const { stageStore } = useCmsStores();
  const [stages, setStages] = useState<IStage[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const res = await stageStore.getAllStages();
      if (res && !stageStore.error) {
        const { stages } = res;
        setStages(stages);
      } else {
        history.push('/cms/dashboard');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {stageStore.isLoading ? (
        <LoadingSpinner type={'section'} />
      ) : (
        stages.map(stage => (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Report
              key={stage.name}
              sceneIdKey={'stageId'}
              sceneId={stage.id!}
              title={stage.name}
            />
          </Space>
        ))
      )}
    </>
  );
});

export default StageReport;
