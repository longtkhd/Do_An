export interface IPermission {
  id?: number;
  name: string;
  status?: 'ACTIVE' | 'INACTIVE';
  code?: string;
}
