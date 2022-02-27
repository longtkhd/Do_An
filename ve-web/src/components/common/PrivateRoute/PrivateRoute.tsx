import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { Location } from 'history';
import { IRoute } from '@/interfaces';
import { useCmsStores, useCommonStores } from '@/hooks';
import { observer } from 'mobx-react';
import { stringify } from 'query-string';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { configConstants } from '@/constants';

interface PrivateRouteProps extends IRoute {
  location?: Location;
}

const PrivateRoute: React.FC<PrivateRouteProps> = observer(
  ({ component: Component, location, ...rest }) => {
    const history = useHistory();
    const { authStore } = useCommonStores();
    const { commonStore } = useCmsStores();
    useEffect(() => {
      const fetchUserInfo = async () => {
        if (authStore.isLoggedIn && !authStore.userInfo) {
          const user = await authStore.getUserInfo();
          if (
            !user ||
            user.code === configConstants.CODE_EXPIRED_REFESH_TOKEN
          ) {
            authStore.logout();
            history.push(
              location?.pathname.includes('/cms') ? '/auth/login' : '/'
            );
          }
        }
      };
      fetchUserInfo();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!authStore.isLoggedIn) {
      if (location?.pathname.includes('/cms')) {
        return (
          <Redirect
            to={{
              pathname: '/auth/login',
              search: stringify({
                redirect: location?.pathname,
              }),
            }}
          />
        );
      }
      return <Redirect to="/" />;
    }

    if (!authStore.userInfo || !commonStore.appRoutes.length) {
      return <LoadingSpinner theme={commonStore.appTheme} type={'page'} />;
    }

    if (
      authStore.userInfo &&
      !authStore.userInfo.roleId &&
      location?.pathname.includes('/cms')
    ) {
      return <Redirect to="/" />;
    }

    return (
      <Route
        {...rest}
        render={routeProps => Component && <Component {...routeProps} />}
      />
    );
  }
);

export default PrivateRoute;
