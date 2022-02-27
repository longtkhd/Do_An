import { IAsset } from './asset';
import { IAttribute } from './common';
import { ISceneTemplate } from './sceneTemplate';

export interface ILobby {
  id?: number;
  name: string;
  status?: 'ACTIVE' | 'INACTIVE';
  attributes?: { [key: string]: IAttribute };
  sceneTemplate: ISceneTemplate;
  logo?: string;
  favicon?: string;
  assets?: IAsset[];
  welcomeMsgTitle?: string;
  welcomeMsg?: string;
  infoBoothButton?: string;
  organizerBoothButton?: string;
}
