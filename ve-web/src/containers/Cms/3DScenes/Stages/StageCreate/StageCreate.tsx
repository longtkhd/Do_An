import React from 'react';
import { observer } from 'mobx-react';
import { IStage } from '@/interfaces';
import { useCmsStores } from '@/hooks';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StageForm from '../StageForm';

const StageCreate: React.FC = observer(() => {
  const { t } = useTranslation();
  const { stageStore } = useCmsStores();
  const history = useHistory();
  const stage: IStage = {
    name: '',
    status: 'ACTIVE',
  };
  const onSave = async (data: IStage) => {
    const res = await stageStore.createStage(data);
    if (res && !stageStore.error) {
      message.success(t('stage.CREATE_STAGE_SUCCESSFULLY'));
      history.push('/cms/pages/stages');
    }
  };
  return <StageForm stage={stage} onSave={onSave} />;
});

export default StageCreate;
