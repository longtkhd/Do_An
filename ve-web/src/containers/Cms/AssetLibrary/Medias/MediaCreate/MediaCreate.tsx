import React from 'react';
import { observer } from 'mobx-react';
import { IAsset } from '@/interfaces';
import { useCmsStores } from '@/hooks';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MediaForm from '../MediaForm';

const MediaCreate: React.FC = observer(() => {
  const { t } = useTranslation();
  const { assetStore } = useCmsStores();
  const history = useHistory();
  const asset: IAsset = {
    name: '',
    value: '',
    status: 'ACTIVE',
  };
  const onSave = async (data: FormData) => {
    const res = await assetStore.createAsset(data);
    if (res && !assetStore.error) {
      message.success(t('asset.CREATE_ASSET_SUCCESSFULLY'));
      history.push('/cms/asset-library/media');
    }
  };
  return <MediaForm asset={asset} onSave={onSave} />;
});

export default MediaCreate;
