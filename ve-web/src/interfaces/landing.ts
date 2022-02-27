export interface ILanding {
  id?: number;
  title: string;
  status?: 'ACTIVE' | 'INACTIVE';
  description?: string;
  background?: string;
  button?: string;
  isAllowLogin?: boolean;
  disableLoginMessage?: string;
}
