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
  UnlockOutlined,
} from '@ant-design/icons';
import { IPagination, IRole } from '@/interfaces';
import IconBtn from '@/components/styles/IconBtn';
import StyledHeading from '@/components/styles/StyledHeading';
import moment from 'moment';

const RoleList: React.FC = observer(() => {
  const initialParams = {
    sort: 'id',
    order: 'descend',
  };
  const { t } = useTranslation();
  const { roleStore } = useCmsStores();
  const [params, setParams] = useState<any>(initialParams);

  const handleDelete = (id?: number) => {
    Modal.confirm({
      title: t('shared.DELETE_CONFIRMATION'),
      content: t('role.DO_YOU_WANT_TO_DELETE_THIS_ROLE'),
      okText: t('shared.DELETE'),
      okType: 'primary',
      okButtonProps: { danger: true },
      cancelText: t('shared.CANCEL'),
      onOk: async () => {
        const res = await roleStore.deleteRole(id!);
        if (res && !roleStore.error) {
          setParams(initialParams);
          message.success(t('role.DELETE_ROLE_SUCCESSFULLY'));
        }
      },
    });
  };

  const columns = [
    {
      title: t('role.ID'),
      dataIndex: 'id',
      sorter: true,
      defaultSortOrder: 'descend' as 'descend',
    },
    {
      title: t('role.NAME'),
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: t('role.STATUS'),
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
      title: t('role.CREATED_AT'),
      dataIndex: 'createdAt',
      sorter: true,
      render: (text: any) => (
        <>
          <ClockCircleOutlined /> {moment(text).format('DD/MM/YYYY HH:mm')}
        </>
      ),
    },
    {
      title: t('role.UPDATED_AT'),
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
      render: (text: any, item: IRole) => {
        return (
          <Space size={5}>
            <Link to={`/cms/roles/edit/${item.id}`}>
              <IconBtn>
                <EditOutlined />
              </IconBtn>
            </Link>
            <IconBtn onClick={() => handleDelete(item.id)}>
              <DeleteOutlined />
            </IconBtn>
            <Link to={`/cms/roles/${item.id}`}>
              <IconBtn>
                <UnlockOutlined />
              </IconBtn>
            </Link>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    roleStore.getRoles(params);
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
      title={<StyledHeading>{t('role.ROLE_LISTING')}</StyledHeading>}
      bordered={false}
      extra={
        <Button type="primary">
          <Link to="/cms/roles/create">{t('role.CREATE_ROLE')}</Link>
        </Button>
      }
    >
      <Table
        bordered
        rowKey="id"
        loading={roleStore.isLoading}
        columns={columns}
        dataSource={roleStore.roles}
        pagination={roleStore.pagination}
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
      />
    </Card>
  );
});

export default RoleList;
