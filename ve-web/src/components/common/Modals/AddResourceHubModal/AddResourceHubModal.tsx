import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Modal, List, Avatar, Pagination, Input, message } from 'antd';
import { CheckCircleOutlined, CodeSandboxOutlined } from '@ant-design/icons';
import { useCmsStores, useCommonStores } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { IAsset, IResourceHub } from '@/interfaces';
import { commonHelpers } from '@/helpers';
import { ListItem, HeaderTool } from './CustomStyled';
import { configConstants } from '@/constants';
import { cloneDeep, debounce } from 'lodash';
import theme from '@/styles/theme';
import StyledHeading from '@/components/styles/StyledHeading';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface AddResourceHubModalProps {
  boothId: number;
  onOk: () => void;
  onCancel: () => void;
}

interface FetchDataProps {
  page?: number;
  pageSize?: number | number;
  name?: string;
}

const AddResourceHubModal: React.FC<AddResourceHubModalProps> = observer(
  ({ boothId, onOk, onCancel }) => {
    const { t } = useTranslation();
    const { authStore } = useCommonStores();
    const { assetStore, resourceHubStore } = useCmsStores();
    const [visible, setVisible] = useState<boolean>(true);
    const [assets, setAssets] = useState<IAsset[]>([]);
    const [currentResourceHubs, setCurrentResourceHubs] = useState<
      IResourceHub[]
    >([]);
    const [selectedAssets, setSelectedAssets] = useState<IAsset[]>([]);

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
        type: 'MEDIA,CONTENT',
        page,
        pageSize,
        name,
      };
      const [resAssets, resResourceHubs] = await Promise.all([
        assetStore.getAssets(params),
        resourceHubStore.getAllResourceHubs({ boothId }),
      ]);
      if (resAssets && resResourceHubs && !assetStore.error) {
        setAssets(resAssets);
        setCurrentResourceHubs(resResourceHubs);
      }
    };

    const handleOk = async () => {
      const resourceHubs = selectedAssets.map(selected => ({
        boothId,
        assetId: selected.id,
      }));
      const res = await resourceHubStore.createResourceHub({ resourceHubs });
      if (res && !resourceHubStore.error) {
        message.success(t('role.ASSIGN_PERMISSION_SUCCESSFULLY'));
        onOk();
        handleCancel();
      }
    };

    const handleCancel = () => {
      setVisible(false);
      commonHelpers.delay(300).then(() => onCancel());
    };

    const getImageUrl = (item: IAsset) => {
      if (item.value) {
        const isImage = configConstants.imageExt.includes(
          item.value
            .split('.')
            .pop()
            ?.toLowerCase()!
        );
        if ((item as any).type === 'MEDIA') {
          return isImage
            ? `${configConstants.ASSETS_URL}/assets/${item.id}/${item.value}`
            : require('@/assets/images/mp4-thumb.png');
        }
        return require('@/assets/images/article-thumb.png');
      }
    };

    const handleSelect = (item: IAsset) => {
      if (!currentResourceHubs.find(current => current.assetId === item.id)) {
        const index = selectedAssets.findIndex(
          selected => selected.id === item.id
        );
        setSelectedAssets(origin => {
          const selectedAssets = cloneDeep(origin);
          if (index >= 0) {
            selectedAssets.splice(index, 1);
          } else {
            selectedAssets.push(item);
          }
          return selectedAssets;
        });
      }
    };

    return (
      <Modal
        visible={visible}
        title={t('resourceHub.ADD_ASSET_TO_RESOURCE_HUB')}
        okButtonProps={{ loading: resourceHubStore.isLoading }}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <HeaderTool>
          <Input.Search
            placeholder={t('shared.INPUT_SEARCH', { field: 'name' })}
            style={{ maxWidth: 250 }}
            onSearch={debounce(value => fetchData({ name: value }), 300)}
            enterButton
          />
        </HeaderTool>
        {assetStore.isLoading ? (
          <LoadingSpinner type={'section'} />
        ) : (
          <>
            <List
              itemLayout="horizontal"
              dataSource={assets}
              renderItem={item => (
                <ListItem
                  onClick={() => handleSelect(item)}
                  selected={
                    !!selectedAssets.find(
                      selected => selected.id === item.id
                    ) ||
                    !!currentResourceHubs.find(
                      current => current.assetId === item.id
                    )
                  }
                  disabled={
                    !!currentResourceHubs.find(
                      current => current.assetId === item.id
                    )
                  }
                  actions={[
                    !!selectedAssets.find(
                      selected => selected.id === item.id
                    ) && (
                      <CheckCircleOutlined
                        style={{ color: theme.colors.primaryColor }}
                      />
                    ),
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={50}
                        src={getImageUrl(item)}
                        icon={!(item as any).avatar && <CodeSandboxOutlined />}
                      />
                    }
                    title={
                      <StyledHeading fontSize={'16px'}>
                        {item.name}
                      </StyledHeading>
                    }
                    description={
                      <StyledHeading fontSize={'14px'}>
                        {(item as any).type}
                      </StyledHeading>
                    }
                  />
                </ListItem>
              )}
            />
            <Pagination
              style={{ marginTop: 10 }}
              current={assetStore.pagination.current}
              pageSize={assetStore.pagination.pageSize}
              total={assetStore.pagination.total}
              onChange={(page, pageSize) => fetchData({ page, pageSize })}
            />
          </>
        )}
      </Modal>
    );
  }
);

export default AddResourceHubModal;
