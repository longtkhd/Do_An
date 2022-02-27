import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Table, Tag, Space, Button, Modal, message, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCmsStores } from '@/hooks';
import {
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { IPagination, IHall } from '@/interfaces';
import { configConstants } from '@/constants';
import IconBtn from '@/components/styles/IconBtn';
import StyledHeading from '@/components/styles/StyledHeading';
import moment from 'moment';

const HallList: React.FC = observer(() => {
  const initialParams = {
    sort: 'id',
    order: 'descend',
  };
  const { t } = useTranslation();
  const { hallStore } = useCmsStores();
  const [params, setParams] = useState<any>(initialParams);

  const handleDelete = (id?: number) => {
    Modal.confirm({
      title: t('shared.DELETE_CONFIRMATION'),
      content: t('hall.DO_YOU_WANT_TO_DELETE_THIS_HALL'),
      okText: t('shared.DELETE'),
      okType: 'primary',
      okButtonProps: { danger: true },
      cancelText: t('shared.CANCEL'),
      onOk: async () => {
        const res = await hallStore.deleteHall(id!);
        if (res && !hallStore.error) {
          setParams(initialParams);
          message.success(t('hall.DELETE_HALL_SUCCESSFULLY'));
        }
      },
    });
  };

  const columns = [
    {
      title: t('hall.ID'),
      dataIndex: 'id',
      sorter: true,
      defaultSortOrder: 'descend' as 'descend',
    },
    {
      title: t('hall.AVATAR'),
      dataIndex: 'image',
      sorter: true,
      width: 92,
      render: (text: any, item: IHall) => {
        return (
          <Image
            style={{ objectFit: 'cover', borderRadius: '50%' }}
            height={60}
            width={60}
            src={`${configConstants.ASSETS_URL}/halls/${item.id}/${item.avatar}`}
            placeholder={true}
            fallback={require('@/assets/images/noimage-thumb.png')}
          />
        );
      },
    },
    {
      title: t('hall.NAME'),
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: t('hall.STATUS'),
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
      title: t('hall.CREATED_AT'),
      dataIndex: 'createdAt',
      sorter: true,
      render: (text: any) => (
        <>
          <ClockCircleOutlined /> {moment(text).format('DD/MM/YYYY HH:mm')}
        </>
      ),
    },
    {
      title: t('hall.UPDATED_AT'),
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
      render: (text: any, item: IHall) => {
        return (
          <Space size={5}>
            <Link to={`/cms/pages/halls/edit/${item.id}`}>
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
    hallStore.getHalls(params);
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
      title={<StyledHeading>{t('hall.HALL_LISTING')}</StyledHeading>}
      bordered={false}
      extra={
        <Button type="primary">
          <Link to="/cms/pages/halls/create">{t('hall.CREATE_HALL')}</Link>
        </Button>
      }
    >
      <Table
        bordered
        rowKey="id"
        loading={hallStore.isLoading}
        columns={columns}
        dataSource={hallStore.halls}
        pagination={hallStore.pagination}
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
      />
    </Card>
  );
});

export default HallList;
