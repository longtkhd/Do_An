import React, { Suspense, useEffect } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { observer } from 'mobx-react';
import { v4 as uuidv4 } from 'uuid';
import { ContentWrapper } from './CustomStyled';
import { useMainSiteStores } from '@/hooks';
import { IRoute } from '@/interfaces';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Topbar from './Topbar';
import mainSiteRoutes from '@/routes/mainSiteRoutes';
import PrivateRoute from '@/components/common/PrivateRoute';

const MainSiteLayout: React.FC = observer(() => {
  const history = useHistory();
  const { commonStore } = useMainSiteStores();

  useEffect(() => {
    const fetchData = async () => {
      if (!commonStore.organizer) {
        const organizer = await commonStore.getOrganizer();
        // if (!organizer) history.push('/404');
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!commonStore.organizer) {
    return <LoadingSpinner type={'page'} />;
  }

  const renderRoute = ({
    component: Component,
    authorize,
    ...rest
  }: IRoute) => {
    if (authorize) {
      return <PrivateRoute key={uuidv4()} component={Component} {...rest} />;
    }
    return (
      <Route
        {...rest}
        exact
        key={uuidv4()}
        render={routeProps => <>{Component && <Component {...routeProps} />}</>}
      />
    );
  };

  return (
    <Layout>
      <Topbar />
      <ContentWrapper>
        <Suspense fallback={null}>
          <Switch>
            {mainSiteRoutes.map(item => renderRoute(item))}
            <Redirect from="/" to="/404" />
          </Switch>
        </Suspense>
      </ContentWrapper>
      {commonStore.isLoading ? <LoadingSpinner type={'page'} /> : null}
    </Layout>
  );
});

export default MainSiteLayout;
