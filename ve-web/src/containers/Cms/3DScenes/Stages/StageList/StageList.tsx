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
import { IPagination, IStage } from '@/interfaces';
import IconBtn from '@/components/styles/IconBtn';
import StyledHeading from '@/components/styles/StyledHeading';
import moment from 'moment';

const StageList: React.FC = observer(() => {
  const initialParams = {
    sort: 'id',
    order: 'descend',
  };
  const { t } = useTranslation();
  const { stageStore } = useCmsStores();
  const [params, setParams] = useState<any>(initialParams);

  const handleDelete = (id?: number) => {
    Modal.confirm({
      title: t('shared.DELETE_CONFIRMATION'),
      content: t('stage.DO_YOU_WANT_TO_DELETE_THIS_STAGE'),
      okText: t('shared.DELETE'),
      okType: 'primary',
      okButtonProps: { danger: true },
      cancelText: t('shared.CANCEL'),
      onOk: async () => {
        const res = await stageStore.deleteStage(id!);
        if (res && !stageStore.error) {
          setParams(initialParams);
          message.success(t('stage.DELETE_STAGE_SUCCESSFULLY'));
        }
      },
    });
  };

  const columns = [
    {
      title: t('stage.ID'),
      dataIndex: 'id',
      sorter: true,
      defaultSortOrder: 'descend' as 'descend',
    },
    {
      title: t('stage.NAME'),
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: t('stage.STATUS'),
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
      title: t('stage.CREATED_AT'),
      dataIndex: 'createdAt',
      sorter: true,
      render: (text: any) => (
        <>
          <ClockCircleOutlined /> {moment(text).format('DD/MM/YYYY HH:mm')}
        </>
      ),
    },
    {
      title: t('stage.UPDATED_AT'),
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
      render: (text: any, item: IStage) => {
        return (
          <Space size={5}>
            <Link to={`/cms/pages/stages/edit/${item.id}`}>
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
    stageStore.getStages(params);
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
      title={<StyledHeading>{t('stage.STAGE_LISTING')}</StyledHeading>}
      bordered={false}
      extra={
        <Button type="primary">
          <Link to="/cms/pages/stages/create">{t('stage.CREATE_STAGE')}</Link>
        </Button>
      }
    >
      <Table
        bordered
        rowKey="id"
        loading={stageStore.isLoading}
        columns={columns}
        dataSource={stageStore.stages}
        pagination={stageStore.pagination}
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
      />
    </Card>
  );
});

export default StageList;
