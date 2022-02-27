import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import moment from 'moment';
import 'moment/locale/vi';

import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import { ConfigProvider } from 'antd';
import { i18nConstants } from '@/constants';
import { i18nHelpers } from '@/helpers';

import i18n from '@/i18n';
import theme from '@/styles/theme';
import * as serviceWorker from './serviceWorker';

const { REGIONS } = i18nConstants;
const { getCurrentLanguage } = i18nHelpers;
const lang = getCurrentLanguage();
if (lang === 'vi') {
  moment.locale('vi');
} else {
  moment.locale('en-gb');
}

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <ConfigProvider locale={REGIONS[getCurrentLanguage()].antdLocale}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ConfigProvider>
  </I18nextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
