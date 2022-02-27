import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { IStage } from '@/interfaces';
import { useHistory, useParams } from 'react-router-dom';
import { useCmsStores } from '@/hooks';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import StageForm from '../StageForm';

interface ParamTypes {
  id: string;
}

const StageEdit: React.FC = observer(() => {
  const { t } = useTranslation();
  const { stageStore } = useCmsStores();
  const history = useHistory();
  const { id: stageId } = useParams<ParamTypes>();
  const [stage, setStage] = useState<IStage>({} as IStage);

  useEffect(() => {
    const fetchData = async () => {
      const res = await stageStore.getStage(+stageId);
      if (res && !stageStore.error) {
        setStage(res.stage);
      } else {
        history.push('/cms/pages/stages');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageId]);

  const onSave = async (data: IStage) => {
    const res = await stageStore.updateStage(stage.id!, data);
    if (res && !stageStore.error) {
      message.success(t('stage.UPDATE_STAGE_SUCCESSFULLY'));
      history.push('/cms/pages/stages');
    }
  };

  return <StageForm stage={stage} onSave={onSave} />;
});

export default StageEdit;
