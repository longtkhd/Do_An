import { IUser } from './user';

export interface IChatMessage {
  id?: number;
  message: string;
  createdAt: Date;
  userId: number;
  src: string;
  user: IUser;
  size: number;
}
