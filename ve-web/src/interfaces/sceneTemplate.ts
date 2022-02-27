import { IAttribute } from './common';

export interface ISceneTemplate {
  id: number;
  name: string;
  status?: 'ACTIVE' | 'INACTIVE';
  path: string;
  thumb: string;
  data: any;
  attributes: { [key: string]: IAttribute };
}
