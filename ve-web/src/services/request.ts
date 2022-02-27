import axios from 'axios';
import { configConstants } from '@/constants';
import authStore from '@/stores/common/authStore';
import { createHashHistory } from 'history';
import { fileHelpers } from '@/helpers';
import Cookies from 'js-cookie';

const BLOB_TYPE = 'blob';

const getCodeBlob = async (error: any) => {
  const { responseType } = error.config;
  if (responseType === BLOB_TYPE) {
    const file: any = await fileHelpers.blobToText(error.response.data);
    const { code } = JSON.parse(file);
    return code;
  }
  return;
};

const handleExpiredAccessToken = async (error: any) => {
  if (!error || !error.response || error.status >= 500) {
    return Promise.reject(error?.response?.data);
  } else {
    const originalRequest = error.config;
    const codeBlob = await getCodeBlob(error);
    if (
      (error.response.data.code === configConstants.CODE_EXPIRED_ACCESS_TOKEN ||
        codeBlob === configConstants.CODE_EXPIRED_ACCESS_TOKEN) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const {
          data: { data },
        } = await axios.post(
          `${configConstants.API_URL_COMMON}/auth/refresh-token`,
          {
            refreshToken: Cookies.get(configConstants.CONFIG_REFRESH_TOKEN),
          }
        );
        authStore.setAccessToken(data.accessToken);
        originalRequest.headers[
          'Authorization'
        ] = `${configConstants.TYPE_TOKEN} ${data.accessToken}`;
        const { data: newData } = await axios(originalRequest);
        return Promise.resolve(newData);
      } catch (error) {
        return Promise.reject(error.response.data);
      }
    } else if (
      error.response.data.code === configConstants.CODE_INVALID_ACCESS_TOKEN
    ) {
      await authStore.logout();
      createHashHistory().push('/');
      return Promise.reject(error.response.data);
    }
  }
  return Promise.reject(error.response.data);
};
// =============CLIENT-COMMON=============
const clientCommon = axios.create({
  baseURL: configConstants.API_URL_COMMON,
});

clientCommon.interceptors.request.use(
  config => {
    const token = authStore.accessToken;
    if (token) {
      config.headers[
        'Authorization'
      ] = `${configConstants.TYPE_TOKEN} ${token}`;
    }
    return config;
  },
  error => error.response.data
);

clientCommon.interceptors.response.use(
  response => response.data,
  error => handleExpiredAccessToken(error)
);
// =============CLIENT-CMS=============
const clientCms = axios.create({
  baseURL: configConstants.API_URL_CMS,
});

clientCms.interceptors.request.use(
  config => {
    const token = authStore.accessToken;
    if (token) {
      config.headers[
        'Authorization'
      ] = `${configConstants.TYPE_TOKEN} ${token}`;
    }
    return config;
  },
  error => error.response.data
);

clientCms.interceptors.response.use(
  response => response.data,
  error => handleExpiredAccessToken(error)
);

// =============CLIENT-MAINSITE=============
const clientMainSite = axios.create({
  baseURL: configConstants.API_URL_STIE,
});

clientMainSite.interceptors.request.use(
  config => {
    const token = authStore.accessToken;
    if (token) {
      config.headers[
        'Authorization'
      ] = `${configConstants.TYPE_TOKEN} ${token}`;
    }
    return config;
  },
  error => error.response.data
);

clientMainSite.interceptors.response.use(
  response => response.data,
  error => handleExpiredAccessToken(error)
);
export { clientCommon, clientCms, clientMainSite };
