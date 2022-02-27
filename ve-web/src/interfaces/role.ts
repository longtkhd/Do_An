export interface IRole {
  id?: number;
  name: string;
  status?: 'ACTIVE' | 'INACTIVE';
  roleAcp?: boolean;
  createdAt?: string;
}
