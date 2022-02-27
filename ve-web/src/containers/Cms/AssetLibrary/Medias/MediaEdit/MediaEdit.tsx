import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { IAsset } from '@/interfaces';
import { useHistory, useParams } from 'react-router-dom';
import { useCmsStores } from '@/hooks';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import MediaForm from '../MediaForm';

interface ParamTypes {
  id: string;
}

const MediaEdit: React.FC = observer(() => {
  const { t } = useTranslation();
  const [asset, setAsset] = useState<IAsset>({} as IAsset);
  const { assetStore } = useCmsStores();
  const history = useHistory();
  const { id: assetId } = useParams<ParamTypes>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await assetStore.getAsset(+assetId);
      if (res && !assetStore.error) {
        setAsset(res.asset);
      } else {
        history.push('/cms/asset-library/media');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId]);

  const onSave = async (data: FormData) => {
    const res = await assetStore.updateAsset(asset.id!, data);
    if (res && !assetStore.error) {
      message.success(t('asset.UPDATE_ASSET_SUCCESSFULLY'));
      history.push('/cms/asset-library/media');
    }
  };

  return <MediaForm mode="EDIT" asset={asset} onSave={onSave} />;
});

export default MediaEdit;
