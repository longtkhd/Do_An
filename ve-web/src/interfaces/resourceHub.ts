import { IBooth } from './booth';
import { IAsset } from './asset';

export interface IResourceHub {
  id?: number;
  status?: 'ACTIVE' | 'INACTIVE';
  boothId: number;
  assetId: number;
  booth: IBooth;
  asset: IAsset;
}
