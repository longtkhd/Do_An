export interface IAsset {
  id?: number;
  key?: string;
  name: string;
  status?: 'ACTIVE' | 'INACTIVE';
  value: string;
}
