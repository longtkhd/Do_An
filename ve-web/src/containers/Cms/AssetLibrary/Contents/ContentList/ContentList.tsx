import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Table, Tag, Space, Button, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCmsStores, useCommonStores } from '@/hooks';
import {
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { IPagination, IAsset } from '@/interfaces';
import IconBtn from '@/components/styles/IconBtn';
import StyledHeading from '@/components/styles/StyledHeading';
import moment from 'moment';

const ContentList: React.FC = observer(() => {
  const { t } = useTranslation();
  const { authStore } = useCommonStores();
  const { assetStore } = useCmsStores();
  const initialParams = {
    sort: 'id',
    order: 'descend',
    boothId:
      authStore.userInfo?.boothId ?? authStore.userInfo?.organizer.boothId,
    type: 'CONTENT',
  };
  const [params, setParams] = useState<any>(initialParams);

  const handleDelete = (id?: number) => {
    Modal.confirm({
      title: t('shared.DELETE_CONFIRMATION'),
      content: t('asset.DO_YOU_WANT_TO_DELETE_THIS_ASSET'),
      okText: t('shared.DELETE'),
      okType: 'primary',
      okButtonProps: { danger: true },
      cancelText: t('shared.CANCEL'),
      onOk: async () => {
        const res = await assetStore.deleteAsset(id!);
        if (res && !assetStore.error) {
          setParams(initialParams);
          message.success(t('asset.DELETE_ASSET_SUCCESSFULLY'));
        }
      },
    });
  };

  const columns = [
    {
      title: t('asset.ID'),
      dataIndex: 'id',
      sorter: true,
      defaultSortOrder: 'descend' as 'descend',
    },
    {
      title: t('asset.NAME'),
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: t('asset.STATUS'),
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
      title: t('asset.CREATED_AT'),
      dataIndex: 'createdAt',
      sorter: true,
      render: (text: any) => (
        <>
          <ClockCircleOutlined /> {moment(text).format('DD/MM/YYYY HH:mm')}
        </>
      ),
    },
    {
      title: t('asset.UPDATED_AT'),
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
      width: 120,
      render: (text: any, item: IAsset) => {
        return (
          <Space size={5}>
            <Link to={`/cms/asset-library/content/edit/${item.id}`}>
              <IconBtn>
                <EditOutlined />
              </IconBtn>
            </Link>
            <IconBtn onClick={() => handleDelete(item.id)}>
              <DeleteOutlined />
            </IconBtn>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    assetStore.getAssets(params);
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

  return (
    <Card
      title={
        <StyledHeading tag={t('asset.CONTENT')}>
          {t('asset.CONTENT_ASSET_LISTING')}
        </StyledHeading>
      }
      bordered={false}
      extra={
        <Button type="primary">
          <Link to="/cms/asset-library/content/create">
            {t('asset.CREATE_ASSET')}
          </Link>
        </Button>
      }
    >
      <Table
        bordered
        rowKey="id"
        loading={assetStore.isLoading}
        columns={columns}
        dataSource={assetStore.assets}
        pagination={assetStore.pagination}
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
      />
    </Card>
  );
});

export default ContentList;
