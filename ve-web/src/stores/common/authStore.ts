import { makeObservable, observable, action, computed } from 'mobx';
import { configConstants } from '@/constants';
import { authService } from '@/services/common';
import { ILogin, IRegister, IUser } from '@/interfaces';
import { availableRoutes } from '@/helpers/permission';
import { commonHelpers, socketHelpers } from '@/helpers';
import commonStore from '@/stores/cms/commonStore';
import chatStore from '@/stores/common/chatStore';
import Cookies from 'js-cookie';
import cmsRoutes from '@/routes/cmsRoutes';
import { cloneDeep } from 'lodash';
import i18n from '@/i18n';

export class AuthStore {
  loadingStack: boolean[] = [];
  accessToken: string | null = localStorage.getItem(
    configConstants.CONFIG_ACCESS_TOKEN
  );
  userInfo: IUser | null = null;
  error: string = '';

  constructor() {
    makeObservable(this, {
      loadingStack: observable,
      accessToken: observable,
      userInfo: observable,
      error: observable,
      isLoading: computed,
      isLoggedIn: computed,
      fullName: computed,
      setLoading: action,
      login: action,
      logout: action,
      setAccessToken: action,
      getUserInfo: action,
      register: action,
    });
  }

  get isLoading() {
    return !!this.loadingStack.length;
  }

  get isLoggedIn() {
    return !!this.accessToken;
  }

  setError(error: string) {
    this.error = error;
  }

  get fullName() {
    return `${this.userInfo?.firstName || ''} ${this.userInfo?.lastName || ''}`;
  }

  setLoading = (state: boolean) => {
    if (state) {
      this.loadingStack.push(state);
    } else {
      this.loadingStack.pop();
    }
  };

  async login(paramsLogin: ILogin) {
    try {
      this.setLoading(true);
      this.setError('');
      const {
        accessToken,
        refreshToken,
        refreshTokenExpiredTime,
      } = await authService.login(paramsLogin);
      Cookies.set(configConstants.CONFIG_REFRESH_TOKEN, refreshToken, {
        expires: refreshTokenExpiredTime / 60 / 60 / 24,
      });
      this.setAccessToken(accessToken);
      return await this.getUserInfo();
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    localStorage.removeItem(configConstants.CONFIG_ACCESS_TOKEN);
    Cookies.remove(configConstants.CONFIG_REFRESH_TOKEN);
    this.accessToken = null;
    this.userInfo = null;
  }

  async setAccessToken(token: string) {
    this.accessToken = token;
    if (token) {
      localStorage.setItem(configConstants.CONFIG_ACCESS_TOKEN, token);
    } else {
      localStorage.removeItem(configConstants.CONFIG_ACCESS_TOKEN);
    }
  }

  async getUserInfo() {
    try {
      this.setLoading(true);
      this.setError('');
      if (this.accessToken) {
        const { user: userInfo } = await authService.getUserInfo();
        // socket
        chatStore.setSocket(socketHelpers.socketClient(this.accessToken));
        const payload = {
          userId: userInfo.id,
          device: commonHelpers.isMobile() ? 'MOBILE' : 'BROWSER',
        };
        chatStore.sendEvent('VISIT', payload);
        // socket
        this.userInfo = userInfo;
        const { permissions = [], role = {} } = userInfo;
        commonStore.setRoutes(
          availableRoutes(cloneDeep(cmsRoutes), permissions, role || {})
        );
        return userInfo;
      } else {
        this.userInfo = null;
        commonStore.setRoutes(availableRoutes(cloneDeep(cmsRoutes)));
        return null;
      }
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }

  async register(data: IRegister) {
    try {
      this.setLoading(true);
      this.setError('');
      return await authService.register(data);
    } catch (error) {
      this.setError(i18n.t(`error.${error.code}`));
    } finally {
      this.setLoading(false);
    }
  }
}

export default new AuthStore();
