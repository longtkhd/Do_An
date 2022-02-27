import React, { useEffect, useState } from 'react';
import { useCmsStores } from '@/hooks';
import { useHistory } from 'react-router';
import { Card, Row, Col, Avatar, Space, Table, DatePicker } from 'antd';
import {
  EyeOutlined,
  ThunderboltOutlined,
  HourglassOutlined,
} from '@ant-design/icons';
import { Information, Name, Figure, ReportWrapper } from './CustomStyled';
import moment from 'moment';
import StyledHeading from '@/components/styles/StyledHeading';
import ButtonTooltip from '@/components/common/ButtonTooltip';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { observer } from 'mobx-react';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

interface ReportProps {
  sceneIdKey: string;
  sceneId: number;
  title: string;
}

const Report: React.FC<ReportProps> = observer(
  ({ title, sceneIdKey, sceneId }) => {
    const { t } = useTranslation();
    const { collectorStore, visitStore } = useCmsStores();
    const history = useHistory();
    const [scenePerformance, setScenePerformance] = useState<any[]>([]);
    const [reportDetail, setReportDetail] = useState<any[]>([]);
    const [dataTable, setDataTable] = useState<any[]>([]);
    const [dataVisitByTime, setDataVisitByTime] = useState<any>([]);
    const [startTime, setStartTime] = useState<any>(
      moment(Date.now()).startOf('day')
    );

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 120,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: 150,
      },
      {
        title: 'Time Spent',
        dataIndex: 'timeSpent',
        render: (time: any) =>
          moment
            .utc(moment.duration(time).asMilliseconds())
            .format('H [hours] mm [minutes]'),
        width: 150,
      },
      {
        title: 'Times Visited',
        dataIndex: 'timesVisited',
        render: (count: number) => `${count} times`,
        width: 100,
      },
      {
        title: 'Center Screen',
        dataIndex: 'lcd_screen',
        render: (count: number) => `${count} clicks`,
        width: 100,
      },
      {
        title: 'Left Banner',
        dataIndex: 'banner1',
        render: (count: number) => `${count} clicks`,
        width: 100,
      },

      {
        title: 'Right Banner',
        dataIndex: 'banner2',
        render: (count: number) => `${count} clicks`,
        width: 100,
      },
    ];
    useEffect(() => {
      const fetchData = async () => {
        const [resSummary, resDetail] = await Promise.all([
          collectorStore.getCollectorSummary(sceneIdKey, sceneId),
          collectorStore.getCollectors({ [sceneIdKey]: sceneId }),
        ]);
        if (resSummary && resDetail && !collectorStore.error) {
          const { reportData } = resSummary;
          setScenePerformance([
            {
              name: reportData.timesVisited.name,
              count: `${reportData.timesVisited.count} times`,
              icon: <EyeOutlined />,
              backgroundColor: '#c22883',
              color: 'white',
              key: 'totalTimesVisited',
            },
            {
              name: reportData.timeSpent.name,
              count: moment
                .utc(
                  moment.duration(reportData.timeSpent.count).asMilliseconds()
                )
                .format('H [hours] mm [minutes]'),
              icon: <HourglassOutlined />,
              backgroundColor: '#fdedbc',
              color: '#3f4093',
              key: 'totalTimeSpent',
            },
            {
              name: reportData.totalInteraction.name,
              count: `${reportData.totalInteraction.count} clicks`,
              icon: <ThunderboltOutlined />,
              backgroundColor: '#3f4093',
              color: 'white',
              key: 'totalInteractions',
            },
          ]);
          const reportDetail: any = [];
          map(reportData, (value, key) => {
            if (
              !['timeSpent', 'timesVisited', 'totalInteraction'].includes(key)
            ) {
              reportDetail.push({ ...value, key });
            }
          });
          setReportDetail(reportDetail);
          const { data } = resDetail;
          console.log(data);
          setDataTable(
            data.map((item: any, index: number) => ({
              key: index,
              name:
                (item?.user?.firstName || '') +
                ' ' +
                (item?.user?.lastName || ''),
              email: item?.user?.email || '',
              timeSpent: item.collector?.timeSpent?.count || 0,
              timesVisited: item.collector?.timesVisited?.count || 0,
              lcd_screen: item.collector?.lcd_screen?.count || 0,
              banner1: item.collector?.banner1?.count || 0,
              banner2: item.collector?.banner2?.count || 0,
            }))
          );
        } else {
          history.push('/cms/dashboard');
        }
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        const params = {
          startTime: new Date(startTime),
          endTime: new Date((startTime as any) + 86400000),
          [sceneIdKey]: sceneId,
        };
        const resVisitByTime = await visitStore.getVisitByTime(params);
        if (resVisitByTime) {
          const { visitsByTime } = resVisitByTime;
          setDataVisitByTime(
            visitsByTime.map((item: any) => ({
              name: moment(item.name).format('HH:mm'),
              visits: item.visits,
            }))
          );
        }
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startTime]);

    const onChangeStartTime = (date: any) => {
      setStartTime(date ? moment(date).startOf('day') : null);
    };

    return (
      <Card title={<StyledHeading>{title} Report</StyledHeading>}>
        {collectorStore.isLoading ? (
          <LoadingSpinner type={'section'} />
        ) : (
          <>
            <Space direction="vertical" style={{ width: '100%' }}>
              <StyledHeading>{title} Performance</StyledHeading>
              <Row gutter={[16, 16]}>
                {scenePerformance &&
                  scenePerformance.map((report: any) => (
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={8}
                      xxl={8}
                      key={report.name}
                    >
                      <Card>
                        <ReportWrapper>
                          <Avatar
                            size={40}
                            icon={report.icon}
                            style={{
                              color: report.color,
                              backgroundColor: report.backgroundColor,
                            }}
                          />
                          <Information>
                            <Name>
                              {report.name}{' '}
                              <ButtonTooltip
                                placement="right"
                                color="rgb(63, 64, 147)"
                                title={''}
                              />
                            </Name>
                            <Figure>{report.count}</Figure>
                          </Information>
                        </ReportWrapper>
                      </Card>
                    </Col>
                  ))}
              </Row>
              <Row gutter={[16, 16]}>
                {reportDetail &&
                  reportDetail.map((report: any) => (
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={8}
                      xxl={8}
                      key={report.name}
                    >
                      <Card>
                        <ReportWrapper>
                          <Information>
                            <Name>
                              {report.name}{' '}
                              <ButtonTooltip
                                placement="right"
                                color="rgb(63, 64, 147)"
                                title={''}
                              />
                            </Name>
                            <Figure>{report.count}</Figure>
                          </Information>
                        </ReportWrapper>
                      </Card>
                    </Col>
                  ))}
              </Row>
              <Row>
                <Col span={24}>
                  <Card
                    title={
                      <>
                        {t('dashboard.VISITS_BY_HOUR')} <ButtonTooltip />
                      </>
                    }
                    extra={
                      <DatePicker
                        style={{ width: 200 }}
                        defaultValue={startTime}
                        onChange={onChangeStartTime}
                      />
                    }
                  >
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart
                        data={dataVisitByTime}
                        margin={{ left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="visits"
                          stroke="#8884d8"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>
              <StyledHeading>
                Detailed Report{' '}
                <ButtonTooltip
                  placement="right"
                  color="rgb(63, 64, 147)"
                  title={''}
                />
              </StyledHeading>
              <Row>
                <Col span={24}>
                  <Table
                    scroll={{ x: 1500, y: 500 }}
                    dataSource={dataTable}
                    pagination={false}
                    columns={columns}
                    bordered
                  />
                </Col>
              </Row>
            </Space>
          </>
        )}
      </Card>
    );
  }
);

export default Report;
