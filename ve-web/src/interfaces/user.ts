import { IBooth } from './booth';
import { IOrganizer } from './organizer';
import { IRole } from './role';

export interface IUser {
  id: number;
  avatar: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE';
  organizerId: number;
  organizer: IOrganizer;
  roleId: number;
  role: IRole;
  boothId: number;
  booth: IBooth;
}
