import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Card, Row, Col, DatePicker } from 'antd';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import ButtonTooltip from '@/components/common/ButtonTooltip';
import StyledHeading from '@/components/styles/StyledHeading';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useCmsStores } from '@/hooks';
import {
  ReportContentWrapper,
  DetailContainer,
  DetailItem,
  DetailItemName,
  DetailItemValue,
} from './CustomStyled';
import moment from 'moment';

const DashboardOrganizer: React.FC = observer(() => {
  const { t } = useTranslation();
  const { userStore, visitStore } = useCmsStores();
  const [dataUserSummary, setDataUserSummary] = useState<any>([]);
  const [dataVisitSummary, setDataVisitSummary] = useState<any>([]);
  const [dataVisitByTime, setDataVisitByTime] = useState<any>([]);
  const [startTime, setStartTime] = useState<any>(
    moment(Date.now()).startOf('day')
  );

  useEffect(() => {
    const fetchData = async () => {
      const [resUser, resVisit] = await Promise.all([
        userStore.getUserSummary(),
        visitStore.getVisitSummary(),
      ]);
      if (resUser) {
        const { totalCreated, totalRegister, totalUser } = resUser;
        setDataUserSummary([
          {
            name: 'Total',
            value: 100,
            originValue: totalUser,
            fill: 'black',
          },
          {
            name: 'Registered',
            value: Math.round(((totalRegister || 0) / (totalUser || 1)) * 100),
            originValue: totalRegister,
            fill: '#3F4093',
          },
          {
            name: 'Created by Organizer',
            value: Math.round(((totalCreated || 0) / (totalUser || 1)) * 100),
            originValue: totalCreated,
            fill: '#bb1176',
          },
        ]);
      }
      if (resVisit) {
        const { totalVisit, totalVisitBrowser, totalVisitMobile } = resVisit;
        setDataVisitSummary([
          {
            name: 'Total',
            value: 100,
            originValue: totalVisit,
            fill: 'black',
          },
          {
            name: 'Browser',
            value: Math.round(
              ((totalVisitBrowser || 0) / (totalVisit || 1)) * 100
            ),
            originValue: totalVisitBrowser || 0,
            fill: '#3F4093',
          },
          {
            name: 'Mobile',
            value: Math.round(
              ((totalVisitMobile || 0) / (totalVisit || 1)) * 100
            ),
            originValue: totalVisitMobile || 0,
            fill: '#bb1176',
          },
        ]);
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
    <>
      <Helmet>
        <title>{t('dashboard.DASHBOARD')}</title>
      </Helmet>
      <Card title={<StyledHeading>{t('dashboard.DASHBOARD')}</StyledHeading>}>
        {visitStore.isLoading || userStore.isLoading ? (
          <LoadingSpinner type={'section'} />
        ) : (
          <>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={24} md={24} lg={12} xxl={12}>
                <Card
                  title={
                    <>
                      {t('dashboard.TOTAL_USERS')} <ButtonTooltip />
                    </>
                  }
                >
                  <ReportContentWrapper>
                    <ResponsiveContainer width={225} height={225}>
                      <PieChart width={225} height={225}>
                        <Pie
                          data={dataUserSummary.slice(1, 3)}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={70}
                          dataKey="value"
                          label={true}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <DetailContainer>
                      {dataUserSummary &&
                        dataUserSummary.map((item: any) => (
                          <DetailItem key={item.name}>
                            <DetailItemName>{item.name}:</DetailItemName>
                            <DetailItemValue>
                              {' '}
                              <span style={{ color: item.fill }}>
                                {item.value}%
                              </span>{' '}
                              (
                              <span style={{ color: item.fill }}>
                                {item.originValue}
                              </span>{' '}
                              users)
                            </DetailItemValue>
                          </DetailItem>
                        ))}
                    </DetailContainer>
                  </ReportContentWrapper>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xxl={12}>
                <Card
                  title={
                    <>
                      {t('dashboard.TOTAL_VISITS')} <ButtonTooltip />
                    </>
                  }
                >
                  <ReportContentWrapper>
                    <ResponsiveContainer width={225} height={225}>
                      <PieChart width={225} height={225}>
                        <Pie
                          data={dataVisitSummary.slice(1, 3)}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={70}
                          dataKey="value"
                          label={true}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <DetailContainer>
                      {dataVisitSummary &&
                        dataVisitSummary.map((item: any) => (
                          <DetailItem key={item.name}>
                            <DetailItemName>{item.name}:</DetailItemName>
                            <DetailItemValue>
                              {' '}
                              <span style={{ color: item.fill }}>
                                {item.value}%
                              </span>{' '}
                              (
                              <span style={{ color: item.fill }}>
                                {item.originValue}
                              </span>{' '}
                              users)
                            </DetailItemValue>
                          </DetailItem>
                        ))}
                    </DetailContainer>
                  </ReportContentWrapper>
                </Card>
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
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
                      <Line type="monotone" dataKey="visits" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  );
});

export default DashboardOrganizer;
