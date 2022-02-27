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
import { IPagination, IPermission } from '@/interfaces';
import IconBtn from '@/components/styles/IconBtn';
import StyledHeading from '@/components/styles/StyledHeading';
import moment from 'moment';

const PermissionList: React.FC = observer(() => {
  const initialParams = {
    sort: 'id',
    order: 'descend',
  };
  const { t } = useTranslation();
  const { permissionStore } = useCmsStores();
  const [params, setParams] = useState<any>(initialParams);

  const handleDelete = (id?: number) => {
    Modal.confirm({
      title: t('shared.DELETE_CONFIRMATION'),
      content: t('permission.DO_YOU_WANT_TO_DELETE_THIS_PERMISSION'),
      okText: t('shared.DELETE'),
      okType: 'primary',
      okButtonProps: { danger: true },
      cancelText: t('shared.CANCEL'),
      onOk: async () => {
        const res = await permissionStore.deletePermission(id!);
        if (res && !permissionStore.error) {
          setParams(initialParams);
          message.success(t('permission.DELETE_PERMISSION_SUCCESSFULLY'));
        }
      },
    });
  };

  const columns = [
    {
      title: t('permission.ID'),
      dataIndex: 'id',
      sorter: true,
      defaultSortOrder: 'descend' as 'descend',
    },
    {
      title: t('permission.NAME'),
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: t('permission.CODE'),
      dataIndex: 'code',
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
      title: t('permission.CREATED_AT'),
      dataIndex: 'createdAt',
      sorter: true,
      render: (text: any) => (
        <>
          <ClockCircleOutlined /> {moment(text).format('DD/MM/YYYY HH:mm')}
        </>
      ),
    },
    {
      title: t('permission.UPDATED_AT'),
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
      render: (text: any, item: IPermission) => {
        return (
          <Space size={5}>
            <Link to={`/cms/permissions/edit/${item.id}`}>
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
    permissionStore.getPermissions(params);
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
        <StyledHeading>{t('permission.PERMISSION_LISTING')}</StyledHeading>
      }
      bordered={false}
      extra={
        <Button type="primary">
          <Link to="/cms/permissions/create">
            {t('permission.CREATE_PERMISSION')}
          </Link>
        </Button>
      }
    >
      <Table
        bordered
        rowKey="id"
        loading={permissionStore.isLoading}
        columns={columns}
        dataSource={permissionStore.permissions}
        pagination={permissionStore.pagination}
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
      />
    </Card>
  );
});

export default PermissionList;
