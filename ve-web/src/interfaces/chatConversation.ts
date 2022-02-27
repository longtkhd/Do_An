import { IBooth } from './booth';
import { IChatMessage } from './chatMessage';
import { IUser } from './user';

export interface IChatConversation {
  id?: number;
  booth: IBooth;
  user: IUser;
  lastMessage: IChatMessage;
  notificationBooth: boolean;
  notificationGuest: boolean;
  notificationUser: boolean;
}
