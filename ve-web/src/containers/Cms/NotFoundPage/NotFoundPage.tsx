import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { Wrapper } from './CustomStyled';
import { useCmsStores } from '@/hooks';

const NotFoundPage: React.FC = observer(() => {
  const { commonStore } = useCmsStores();
  return (
    <Wrapper>
      <Helmet>
        <title>404</title>
      </Helmet>
      <div className="content">
        <div className="browser-bar">
          <span className="close button" />
          <span className="min button" />
          <span className="max button" />
        </div>
        <div className="text">
          <p>
            -bash: Oops! The page you're looking for was not found. Go back{' '}
            <Link to={'/'} style={{ color: commonStore.appTheme.solidColor }}>
              home
            </Link>{' '}
            and start over.
          </p>
          <p>
            Users-MBP:~ user$ <span className="indicator" />
          </p>
        </div>
      </div>
    </Wrapper>
  );
});

export default NotFoundPage;
