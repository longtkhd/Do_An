import { IAsset } from './asset';
import { IAttribute } from './common';
import { ISceneTemplate } from './sceneTemplate';

export interface IHall {
  id?: number;
  name: string;
  status?: 'ACTIVE' | 'INACTIVE';
  attributes?: { [key: string]: IAttribute };
  sceneTemplateId: number;
  sceneTemplate: ISceneTemplate;
  avatar?: string;
  assets?: IAsset[];
}
