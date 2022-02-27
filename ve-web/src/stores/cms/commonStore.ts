import { IAttribute, IExtraData, IRoute, IModelItem } from '@/interfaces';
import { action, computed, makeObservable, observable } from 'mobx';
import { cloneDeep } from 'lodash';
import {
  i18nConstants,
  localStorageConstants,
  themeConstants,
} from '@/constants';
import { i18nHelpers } from '@/helpers';
import { extraDataService } from '@/services/cms';

const {
  LAYOUT_TYPE_FULL,
  NAV_STYLE_FIXED,
  THEME_COLOR,
  THEME_TYPE_LITE,
} = themeConstants;
const { I18N } = localStorageConstants;
const { REGIONS, DEFAULT_LANG } = i18nConstants;

export class CommonStore {
  loadingStack: boolean[] = [];
  navCollapsed = true;
  appRoutes: IRoute[] = [];
  appMenus: IRoute[] = [];
  navStyle = NAV_STYLE_FIXED;
  layoutType = LAYOUT_TYPE_FULL;
  themeType = THEME_TYPE_LITE;
  themeColor = THEME_COLOR;
  width = window.innerWidth;
  locale = REGIONS[localStorage.getItem(I18N) || DEFAULT_LANG];
  extraData: IExtraData = {} as IExtraData;
  extraDataLoading = false;
  appTheme = {
    name: 'default',
    solidColor: '#F26524',
    solidLightColor: '#ecf9f6',
    gradientColor: 'linear-gradient(167.51deg, #f26524 24.37%, #f26524 78.07%)',
    shadowColor: '0 2px 10px rgba(46,207,148,0.6)',
  };
  doSetAttributes: IAttribute | IModelItem = {} as IAttribute;
  error: string = '';

  constructor() {
    makeObservable(this, {
      loadingStack: observable,
      navCollapsed: observable,
      appRoutes: observable,
      appMenus: observable,
      appTheme: observable,
      navStyle: observable,
      layoutType: observable,
      themeType: observable,
      themeColor: observable,
      width: observable,
      locale: observable,
      extraData: observable,
      extraDataLoading: observable,
      doSetAttributes: observable,
      error: observable,
      isLoading: computed,
      allPermissions: computed,
      getAppRoutes: action,
      toggleCollapsedSideNav: action,
      setRoutes: action,
      setThemeColor: action,
      setThemeType: action,
      onNavStyleChange: action,
      onLayoutTypeChange: action,
      updateWindowWidth: action,
      switchLanguage: action,
      setExtraData: action,
      fetchExtraData: action,
      setExtraDataLoading: action,
      setDoSetAttributes: action,
    });
  }

  get isLoading() {
    return this.loadingStack.length;
  }

  setError(error: string) {
    this.error = error;
  }

  get allPermissions() {
    if (
      this.extraData &&
      this.extraData.permissions &&
      this.extraData.permissions.length
    ) {
      return this.extraData.permissions;
    }
    return [];
  }

  setLoading = (state: boolean) => {
    if (state) {
      this.loadingStack.push(state);
    } else {
      this.loadingStack.pop();
    }
  };

  getAppRoutes(routes: IRoute[] = [], appRoutes: IRoute[] = []) {
    routes.forEach(item => {
      if (item.subs) {
        this.getAppRoutes(item.subs, appRoutes);
      }
      if (item.component) appRoutes.push(item);
    });
    return appRoutes;
  }

  getAppMenus(routes: IRoute[] = []) {
    routes = routes.filter(r => !r.hide);
    routes.forEach((item, index) => {
      if (item.subs) {
        item.subs = item.subs.filter(s => !s.hide);
        if (!item.subs.length) {
          routes.splice(index, 1);
        } else {
          this.getAppMenus(item.subs);
        }
      }
    });
    return routes;
  }

  toggleCollapsedSideNav = (b: boolean) => {
    this.navCollapsed = b;
  };

  setRoutes = (routes: IRoute[]) => {
    this.appMenus = this.getAppMenus(cloneDeep(routes));
    this.appRoutes = this.getAppRoutes(routes);
  };

  setThemeColor = (x: string) => {
    this.themeColor = x;
  };

  setThemeType = (x: string) => {
    this.themeType = x;
  };

  onNavStyleChange = (x: string) => {
    this.navStyle = x;
  };

  onLayoutTypeChange = (x: string) => {
    this.layoutType = x;
  };

  updateWindowWidth = (x: number) => {
    this.width = x;
  };

  switchLanguage = (x: any) => {
    i18nHelpers.changeLanguage(x.key);
    this.locale = x;
  };

  setExtraData(data: IExtraData) {
    this.extraData = { ...(this.extraData || {}), ...data };
  }

  setExtraDataLoading(state: boolean) {
    this.extraDataLoading = state;
  }

  async fetchExtraData(types: string[]) {
    try {
      this.setExtraDataLoading(true);
      const res = await extraDataService.getExtraData(types);
      this.setExtraData(res);
    } finally {
      this.setExtraDataLoading(false);
    }
  }

  setDoSetAttributes(data: IAttribute | IModelItem) {
    this.doSetAttributes = data;
  }
}

export default new CommonStore();
