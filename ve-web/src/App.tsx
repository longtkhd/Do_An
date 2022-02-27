import React from 'react';
import './App.less';
import '@/assets/vendors/styles';
import { Helmet } from 'react-helmet';
// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import AuthPage from '@/containers/Cms/AuthPage';
import NotFoundPage from '@/containers/Cms/NotFoundPage';

// Layouts
import CmsLayout from '@/components/layouts/CmsLayout';
import MainSiteLayout from '@/components/layouts/MainSiteLayout';
import PrivateRoute from '@/components/common/PrivateRoute';
import Zoom from '@/containers/MainSite/Zoom';
import EndMeeting from '@/containers/MainSite/EndMeeting';

const App: React.FC = () => {
  return (
    <Router>
      <Helmet
        titleTemplate="%s - Virtual Event UET"
        defaultTitle="Virtual Event UET"
      />
      <Switch>
        <Route exact path="/auth/:authType" component={AuthPage} />
        <Route exact path="/404" component={NotFoundPage} />
        <PrivateRoute path="/cms" component={CmsLayout} />
        <Route exact path="/end-meeting" component={EndMeeting} />
        <Route exact path="/zoom" component={Zoom} />
        <Route path="/" component={MainSiteLayout} />
      </Switch>
    </Router>
  );
};

export default App;
