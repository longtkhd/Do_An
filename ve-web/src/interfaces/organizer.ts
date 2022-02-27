import { ILanding } from './landing';
import { ILobby } from './lobby';

export interface IOrganizer {
  id: number;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  lobbyId?: number;
  boothId?: number;
  landingId?: number;
  infoDeskId?: number;
  landing: ILanding;
  lobby: ILobby;
}
