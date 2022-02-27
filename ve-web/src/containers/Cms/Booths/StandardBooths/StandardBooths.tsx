import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Table, Image, Space, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCmsStores } from '@/hooks';
import {
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { IPagination, IBooth } from '@/interfaces';
import IconBtn from '@/components/styles/IconBtn';
import StyledHeading from '@/components/styles/StyledHeading';
import moment from 'moment';
import { configConstants } from '@/constants';

const StandardBooth: React.FC = observer(() => {
  const initialParams = {
    sort: 'id',
    order: 'descend',
    type: 'STANDARD',
  };
  const { t } = useTranslation();
  const { boothStore } = useCmsStores();
  const [params, setParams] = useState<any>(initialParams);

  const handleDelete = (id?: number) => {
    Modal.confirm({
      title: t('shared.DELETE_CONFIRMATION'),
      content: t('booth.DO_YOU_WANT_TO_DELETE_THIS_BOOTH'),
      okText: t('shared.DELETE'),
      okType: 'primary',
      okButtonProps: { danger: true },
      cancelText: t('shared.CANCEL'),
      onOk: async () => {
        const res = await boothStore.deleteBooth(id!);
        if (res && !boothStore.error) {
          setParams(initialParams);
          message.success(t('booth.DELETE_BOOTH_SUCCESSFULLY'));
        }
      },
    });
  };

  const columns = [
    {
      title: t('booth.ID'),
      dataIndex: 'id',
      sorter: true,
      defaultSortOrder: 'descend' as 'descend',
    },
    {
      title: t('booth.AVATAR'),
      dataIndex: 'avatar',
      width: 160,
      render: (text: any, item: IBooth) => {
        return (
          <Image
            style={{ objectFit: 'cover' }}
            height={70}
            src={`${configConstants.ASSETS_URL}/booths/${item.id}/${item.avatar}`}
            placeholder={true}
            fallback={require('@/assets/images/noimage-thumb.png')}
          />
        );
      },
    },
    {
      title: t('booth.NAME'),
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: t('booth.CREATED_AT'),
      dataIndex: 'createdAt',
      sorter: true,
      render: (text: any) => (
        <>
          <ClockCircleOutlined /> {moment(text).format('DD/MM/YYYY HH:mm')}
        </>
      ),
    },
    {
      title: t('booth.UPDATED_AT'),
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
      width: 160,
      render: (text: any, item: IBooth) => {
        return (
          <Space size={5}>
            <Link to={`/cms/booths/edit/${item.id}`}>
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
    boothStore.getBooths(params);
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
      title={<StyledHeading>{t('booth.STANDARD_BOOTHS')}</StyledHeading>}
      bordered={false}
    >
      <Table
        bordered
        rowKey="id"
        loading={boothStore.isLoading}
        columns={columns}
        dataSource={boothStore.booths}
        pagination={boothStore.pagination}
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
      />
    </Card>
  );
});

export default StandardBooth;
