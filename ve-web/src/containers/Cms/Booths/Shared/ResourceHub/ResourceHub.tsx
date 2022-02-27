import React, { ReactNode, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Card, Table, Tag, Space, Button, Image, Modal, message } from 'antd';
import StyledHeading from '@/components/styles/StyledHeading';
import IconBtn from '@/components/styles/IconBtn';
import { DeleteOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { IAsset, IPagination, IResourceHub } from '@/interfaces';
import { useCmsStores } from '@/hooks';
import AddResourceHubModal from '@/components/common/Modals/AddResourceHubModal';
import { configConstants } from '@/constants';

interface ResourceHubProps {
  boothId: number;
}

const ResourceHub: React.FC<ResourceHubProps> = observer(({ boothId }) => {
  const { t } = useTranslation();
  const { resourceHubStore } = useCmsStores();
  const [addResourceHubModal, setAddResourceHubModal] = useState<ReactNode>();
  const initialParams = {
    sort: 'id',
    order: 'descend',
    boothId,
  };
  const [params, setParams] = useState<any>(initialParams);

  const handleDelete = (id?: number) => {
    Modal.confirm({
      title: t('shared.DELETE_CONFIRMATION'),
      content: t('resourceHub.DO_YOU_WANT_TO_DELETE_THIS_ASSET'),
      okText: t('shared.DELETE'),
      okType: 'primary',
      okButtonProps: { danger: true },
      cancelText: t('shared.CANCEL'),
      onOk: async () => {
        const res = await resourceHubStore.deleteResourceHub(id!);
        if (res && !resourceHubStore.error) {
          setParams(initialParams);
          message.success(
            t('resourceHub.DELETE_ASSET_FROM_RESOURCE_HUB_SUCCESSFULLY')
          );
        }
      },
    });
  };

  const columns = [
    {
      title: t('resourceHub.ID'),
      dataIndex: 'id',
      sorter: true,
      defaultSortOrder: 'descend' as 'descend',
    },
    {
      title: t('asset.PREVIEW'),
      dataIndex: 'image',
      width: 160,
      render: (text: any, item: IResourceHub) => {
        const { asset } = item;
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
        return (
          <Image
            style={{ objectFit: 'cover' }}
            height={70}
            src={getImageUrl(asset)}
            placeholder={true}
            fallback={require('@/assets/images/noimage-thumb.png')}
          />
        );
      },
    },
    {
      title: t('resourceHub.TYPE'),
      dataIndex: 'type',
      sorter: true,
      render: (text: string, item: IResourceHub) => (item.asset as any).type,
    },
    {
      title: t('resourceHub.NAME'),
      dataIndex: 'name',
      sorter: true,
      render: (text: string, item: IResourceHub) => item.asset.name,
    },
    {
      title: t('resourceHub.STATUS'),
      dataIndex: 'status',
      sorter: true,
      render: (text: string) =>
        text === 'ACTIVE' ? (
          <Tag color="green">{t('shared.ACTIVE')}</Tag>
        ) : (
          <Tag color="red">{t('shared.INACTIVE')}</Tag>
        ),
    },
    {
      title: t('resourceHub.CREATED_AT'),
      dataIndex: 'createdAt',
      sorter: true,
      render: (text: any) => (
        <>
          <ClockCircleOutlined /> {moment(text).format('DD/MM/YYYY HH:mm')}
        </>
      ),
    },
    {
      title: t('resourceHub.UPDATED_AT'),
      dataIndex: 'updatedAt',
      sorter: true,
      render: (text: any) => (
        <>
          <ClockCircleOutlined /> {moment(text).format('DD/MM/YYYY HH:mm')}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right' as 'right',
      width: 80,
      render: (text: any, item: IResourceHub) => {
        return (
          <Space size={5}>
            <IconBtn onClick={() => handleDelete(item.id)}>
              <DeleteOutlined />
            </IconBtn>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    resourceHubStore.getResourceHubs(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleTableChange = (
    pagination: IPagination,
    filters: any,
    sorter: any
  ) => {
    setParams({
      ...params,
      sort: sorter.field,
      order: sorter.order,
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const showAddResourceHubModal = () => {
    setAddResourceHubModal(
      <AddResourceHubModal
        boothId={boothId}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      />
    );
  };

  const handleOk = async () => {
    setParams(initialParams);
  };

  const handleCancel = () => {
    setAddResourceHubModal(<></>);
  };

  return (
    <Card
      title={<StyledHeading>{t('resourceHub.RESOURCE_HUB')} </StyledHeading>}
      bordered={false}
      extra={
        <Button onClick={showAddResourceHubModal} type="primary">
          {t('resourceHub.ADD_ASSET_TO_RESOURCE_HUB')}
        </Button>
      }
    >
      <Table
        bordered
        rowKey="id"
        loading={resourceHubStore.isLoading}
        columns={columns}
        dataSource={resourceHubStore.resourceHubs}
        pagination={resourceHubStore.pagination}
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
      />
      {addResourceHubModal}
    </Card>
  );
});

export default ResourceHub;
