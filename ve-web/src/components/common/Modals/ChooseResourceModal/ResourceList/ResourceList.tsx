import React, { useEffect } from 'react';
import { useCmsStores, useCommonStores } from '@/hooks';
import { observer } from 'mobx-react';
import { Row, Col, Input, Button, Pagination, Empty } from 'antd';
import { IAsset } from '@/interfaces';
import { HeaderTool } from './CustomStyled';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import Resource from '../Resource';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface ResourceListProps {
  assetId: number | undefined;
  selectedResourse: IAsset | undefined;
  setSelectedResourse: (data: IAsset) => void;
  setTab: (tab: string) => void;
}

interface FetchDataProps {
  page?: number;
  pageSize?: number | number;
  name?: string;
}

const ResourceList: React.FC<ResourceListProps> = observer(
  ({ selectedResourse, setSelectedResourse, assetId, setTab }) => {
    const { t } = useTranslation();
    const { authStore } = useCommonStores();
    const { assetStore } = useCmsStores();

    useEffect(() => {
      fetchData({});
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async ({
      page = 1,
      pageSize = 12,
      name,
    }: FetchDataProps) => {
      const params = {
        boothId:
          authStore.userInfo?.boothId ?? authStore.userInfo?.organizer.boothId,
        sort: 'id',
        order: 'descend',
        type: 'MEDIA',
        page,
        pageSize,
        name,
      };
      const res = await assetStore.getAssets(params);
      if (res && !assetStore.error) {
        const selectedAsset = res.find((item: any) => item.id === assetId);
        setSelectedResourse(selectedAsset);
      }
    };

    return (
      <>
        <HeaderTool>
          <Input.Search
            placeholder={t('shared.INPUT_SEARCH', { field: 'name' })}
            style={{ maxWidth: 250 }}
            onSearch={debounce(value => fetchData({ name: value }), 300)}
            enterButton
          />
          <Button type="primary" onClick={() => setTab('CREATE')}>
            {t('shared.CREATE_NEW_RESOURSE')}
          </Button>
        </HeaderTool>
        {assetStore.isLoading ? (
          <LoadingSpinner type={'section'} />
        ) : assetStore.assets.length ? (
          <>
            <Row gutter={[10, 10]}>
              {assetStore.assets.map(item => (
                <Col xs={12} sm={8} md={6} lg={6} xxl={6} key={item.id}>
                  <Resource
                    item={item}
                    selected={item.id === selectedResourse?.id}
                    setSelectedResourse={setSelectedResourse}
                  />
                </Col>
              ))}
            </Row>
            <Pagination
              current={assetStore.pagination.current}
              pageSize={assetStore.pagination.pageSize}
              total={assetStore.pagination.total}
              onChange={(page, pageSize) => fetchData({ page, pageSize })}
            />
          </>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </>
    );
  }
);

export default ResourceList;
