import { IAsset } from './asset';

export interface IZoomMeeting {
  apiKey: string;
  apiSecret: string;
  meetingId: string;
  meetingPassword: string;
  passwordRequired: boolean;
  signature: string;
}

export interface IStage {
  id?: number;
  name: string;
  status?: 'ACTIVE' | 'INACTIVE';
  type?: 'ZOOM' | 'IMAGE' | 'VIDEO' | 'YOUTUBE';
  assets?: IAsset[];
  zoomMeeting?: IZoomMeeting;
  bannerLeftUrl?: string;
  bannerRightUrl?: string;
  bannerLeft?: string;
  bannerRight?: string;
  youtubeUrl?: string;
  centreScreen?: string;
  centreScreenUrl?: string;
}
