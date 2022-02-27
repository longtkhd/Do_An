import { Locale } from 'antd/lib/locale-provider';
import { FunctionComponent, ReactType } from 'react';
import { IBooth } from './booth';
import { IHall } from './hall';
import { IPermission } from './permission';
import { IStage } from './stage';

export interface IRegionItem {
  key: string;
  name: string;
  flag: string;
  antdLocale: Locale;
}

export interface IRegion {
  [key: string]: IRegionItem;
}

export interface AppTheme {
  name: string;
  solidColor: string;
  solidLightColor: string;
  gradientColor: string;
  shadowColor: string;
}

export interface IRouteBase {
  path: string;
  title?: string;
  icon?: FunctionComponent<{ className?: string }>;
  component?: ReactType;
  query?: string;
  requireAuth?: string;
  route?: string;
  login?: boolean;
  permissions?: String[];
  hide?: boolean;
  authorize?: boolean;
}

export interface IRoute extends IRouteBase {
  subs?: IRoute[];
}

export interface IPagination {
  total?: number;
  current?: number;
  defaultPageSize?: number;
  pageSize?: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
}

export interface IExtraData {
  permissions: IPermission[];
}

export interface IAction {
  type: string;
  url?: string;
  name?: string;
  key?: string;
}

export interface IPreset {
  name: string;
  value: any;
  key: string;
}

export interface IAttribute {
  action: IAction;
  assetType: string;
  group_name: string;
  key: string;
  type: string;
  model: string;
  name: string;
  value: any;
  index: number;
  items: IModelItem[];
  presetValue: IPreset[];
  assetId?: number;
  oldAssetId?: number;
  boothNumber: number;
  modelIdKey: string;
}

export interface IModelItem {
  key: string;
  index: number;
  name: string;
  modelId?: number;
  oldModelId?: number;
  value: ModelType | null;
  modelIdKey: string;
  assetType: string;
  pos: number[];
}

export interface ModelType extends IHall, IStage, IBooth {
  key?: string;
}
