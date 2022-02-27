import { IAsset } from './asset';
import { IAttribute } from './common';
import { ISceneTemplate } from './sceneTemplate';

export interface IBooth {
  id?: number;
  name: string;
  status?: 'ACTIVE' | 'INACTIVE';
  attributes?: { [key: string]: IAttribute };
  sceneTemplate: ISceneTemplate;
  avatar?: string;
  assets?: IAsset[];
  pos?: number[];
  aboutUs?: string;
  websiteUrl?: string;
  meetingUrl?: string;
}
