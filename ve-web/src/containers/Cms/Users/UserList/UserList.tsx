import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Table, Tag, Space, Button, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCmsStores } from '@/hooks';
import {
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { IPagination, IUser } from '@/interfaces';
import IconBtn from '@/components/styles/IconBtn';
import StyledHeading from '@/components/styles/StyledHeading';
import moment from 'moment';

const UserList: React.FC = observer(() => {
  const initialParams = {
    sort: 'id',
    order: 'descend',
  };
  const { t } = useTranslation();
  const { userStore } = useCmsStores();
  const [params, setParams] = useState<any>(initialParams);

  const handleDelete = (id?: number) => {
    Modal.confirm({
      title: t('shared.DELETE_CONFIRMATION'),
      content: t('user.DO_YOU_WANT_TO_DELETE_THIS_USER'),
      okText: t('shared.DELETE'),
      okType: 'primary',
      okButtonProps: { danger: true },
      cancelText: t('shared.CANCEL'),
      onOk: async () => {
        const res = await userStore.deleteUser(id!);
        if (res && !userStore.error) {
          setParams(initialParams);
          message.success(t('user.DELETE_USER_SUCCESSFULLY'));
        }
      },
    });
  };

  const columns = [
    {
      title: t('user.ID'),
      dataIndex: 'id',
      sorter: true,
      defaultSortOrder: 'descend' as 'descend',
    },
    {
      title: t('user.FULL_NAME'),
      dataIndex: 'name',
      render: (text: any, item: IUser) =>
        (item.firstName || '') + ' ' + (item.lastName || ''),
    },
    {
      title: t('user.USER_NAME'),
      dataIndex: 'userName',
      sorter: true,
    },
    {
      title: t('user.EMAIL'),
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: t('user.PHONE'),
      dataIndex: 'phone',
      sorter: true,
    },
    {
      title: t('permission.STATUS'),
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
      title: t('user.CREATED_AT'),
      dataIndex: 'createdAt',
      sorter: true,
      render: (text: any) => (
        <>
          <ClockCircleOutlined /> {moment(text).format('DD/MM/YYYY HH:mm')}
        </>
      ),
    },
    {
      title: t('user.UPDATED_AT'),
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
      render: (text: any, item: IUser) => {
        return (
          <Space size={5}>
            <Link to={`/cms/users/edit/${item.id}`}>
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
    userStore.getUsers(params);
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
      title={<StyledHeading>{t('user.USER_LISTING')}</StyledHeading>}
      bordered={false}
      extra={
        <Button type="primary">
          <Link to="/cms/users/create">{t('user.CREATE_USER')}</Link>
        </Button>
      }
    >
      <Table
        bordered
        rowKey="id"
        loading={userStore.isLoading}
        columns={columns}
        dataSource={userStore.users}
        pagination={userStore.pagination}
        scroll={{ x: 1200 }}
        onChange={handleTableChange}
      />
    </Card>
  );
});

export default UserList;
