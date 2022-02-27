import React, { ReactNode, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Card, Button, Descriptions, Tag, Space, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useCmsStores } from '@/hooks';
import { IPermission, IRole } from '@/interfaces';
import StyledHeading from '@/components/styles/StyledHeading';
import AssignPermissionModal from '@/components/common/Modals/AssignPermissionModal';
import moment from 'moment';

interface ParamTypes {
  id: string;
}

const RoleDetail: React.FC = observer(() => {
  const { t } = useTranslation();
  const { roleStore } = useCmsStores();
  const history = useHistory();
  const [role, setRole] = useState<IRole>({} as IRole);
  const [assignPermissionModal, setAssignPermissionModal] = useState<
    ReactNode
  >();
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const { id: roleId } = useParams<ParamTypes>();

  const columns = [
    {
      title: t('permission.ID'),
      dataIndex: 'id',
    },
    {
      title: t('permission.NAME'),
      dataIndex: 'name',
    },
    {
      title: t('permission.CODE'),
      dataIndex: 'code',
    },
    {
      title: t('permission.STATUS'),
      dataIndex: 'status',
      render: (text: string) =>
        text === 'ACTIVE' ? (
          <Tag color="green">{t('shared.ACTIVE')}</Tag>
        ) : (
          <Tag color="red">{t('shared.INACTIVE')}</Tag>
        ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ role }, { permissions }] = await Promise.all([
          roleStore.getRole(+roleId),
          roleStore.getPermissionsByRole(+roleId),
        ]);
        if (role && permissions) {
          setRole(role);
          setPermissions(permissions);
        } else {
          history.push('/cms/roles/list');
        }
      } catch (error) {
        history.push('/cms/roles/list');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId]);

  const showAssignPermissionModal = () => {
    setAssignPermissionModal(
      <AssignPermissionModal
        currentPermissions={permissions}
        roleId={role.id!}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      />
    );
  };

  const handleOk = async () => {
    const { permissions } = await roleStore.getPermissionsByRole(role.id!);
    setPermissions(permissions);
  };

  const handleCancel = () => {
    setAssignPermissionModal(<></>);
  };

  return (
    <Space direction="vertical" size={20}>
      <Card
        title={<StyledHeading>{t('role.ROLE_INFO')}</StyledHeading>}
        bordered={false}
        extra={
          <Button>
            <Link to="/cms/roles/list">
              <ArrowLeftOutlined /> {t('shared.BACK')}
            </Link>
          </Button>
        }
      >
        <Descriptions>
          <Descriptions.Item label={t('role.NAME')}>
            {role.name}
          </Descriptions.Item>
          <Descriptions.Item label={t('role.STATUS')}>
            {role.status === 'ACTIVE' ? (
              <Tag color="green">{t('shared.ACTIVE')}</Tag>
            ) : (
              <Tag color="red">{t('shared.INACTIVE')}</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label={t('role.CREATED_AT')}>
            {moment(role.createdAt).format('DD/MM/YYYY HH:mm')}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        title={<StyledHeading>{t('role.PERMISSION_LIST')}</StyledHeading>}
        bordered={false}
        extra={
          <Button onClick={() => showAssignPermissionModal()} type="primary">
            {t('role.ASSIGN_PERMISSION')}
          </Button>
        }
      >
        <Table
          bordered
          rowKey="id"
          loading={roleStore.isLoading}
          columns={columns}
          dataSource={permissions}
          pagination={false}
          scroll={{ x: 1000 }}
        />
        {assignPermissionModal}
      </Card>
    </Space>
  );
});

export default RoleDetail;
