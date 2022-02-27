import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { MainContentWrapper, ContentWrapper } from './CustomStyled';
import { v4 as uuidv4 } from 'uuid';
import { observer } from 'mobx-react';
import { useCmsStores } from '@/hooks';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const { Footer } = Layout;

const CmsLayout: React.FC = observer(() => {
  const { commonStore } = useCmsStores();
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Topbar />
        <ContentWrapper>
          <MainContentWrapper>
            <Suspense fallback={null}>
              <Switch>
                {commonStore.appRoutes.map(
                  ({ component: Component, ...rest }) => {
                    return (
                      <Route
                        {...rest}
                        exact
                        key={uuidv4()}
                        render={routeProps => (
                          <>{Component && <Component {...routeProps} />}</>
                        )}
                      />
                    );
                  }
                )}
                {/* <Redirect from="/" to="/404" /> */}
              </Switch>
            </Suspense>
          </MainContentWrapper>
          <Footer>Copyright UetTeam © {new Date().getFullYear()}</Footer>
        </ContentWrapper>
      </Layout>
      {commonStore.isLoading ? <LoadingSpinner type={'page'} /> : null}
    </Layout>
  );
});

export default CmsLayout;
