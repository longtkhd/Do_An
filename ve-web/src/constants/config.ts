const PREFIX = '/api/v1';
const CONFIG_ACCESS_TOKEN = 'ACCESS_TOKEN';
const CONFIG_REFRESH_TOKEN = 'REFRESH_TOKEN';
const CODE_EXPIRED_ACCESS_TOKEN = 'EXPIRED_ACCESS_TOKEN';
const CODE_INVALID_ACCESS_TOKEN = 'INVALID_ACCESS_TOKEN';
const CODE_EXPIRED_REFESH_TOKEN = 'EXPIRED_REFESH_TOKEN';
const REACT_APP_API_URL = (window.location.protocol === "http:" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL_HTTPS) + PREFIX;

const assetTypes = {
  COLOR: 'color',
  IMAGE: 'image',
  VIDEO: 'video',
  GROUP_SCENE: 'group_scene',
  TEXT: 'text',
  EXTERNAL: 'external',
  TEXTURE_OPTIONS: 'texture_options',
  OBJECT: 'object',
  ACTION: 'action',
};

const elementActions = {
  OPEN_RESOURCE: 'open_resource',
  OPEN_CHAT: 'open_chat',
  POPUP: 'popup',
  NEWLINK: 'newlink',
};

const modelTypes = {
  HALL: 'hall',
  STAGE: 'stage',
  BOOTH: 'booth',
  LOBBY: 'lobby',
};

const roles = {
  ORGANIZER: 14,
  BOOTH_OWNER: 13,
  SUPER_ADMIN: 1,
};

const sceneTypes = {
  BOOTH: 'BOOTH',
  LOBBY: 'LOBBY',
  HALL: 'HALL',
  INFORMATION_BOOTH: 'INFORMATION_BOOTH',
};

const appPortals = {
  MAINSITE: 'MAINSITE',
  CMS: 'CMS',
};

export default {
  API_URL: process.env.REACT_APP_API_URL!,
  API_URL_COMMON: `${REACT_APP_API_URL}/common`,
  API_URL_STIE: REACT_APP_API_URL,
  API_URL_CMS: `${REACT_APP_API_URL}/cms`,
  ASSETS_URL: 'https://virtualevent.sgp1.cdn.digitaloceanspaces.com',
  CONFIG_ACCESS_TOKEN,
  CONFIG_REFRESH_TOKEN,
  CODE_EXPIRED_ACCESS_TOKEN,
  CODE_INVALID_ACCESS_TOKEN,
  CODE_EXPIRED_REFESH_TOKEN,
  TYPE_TOKEN: 'Bearer',
  videoExt: ['mp4', 'webm', 'mpv', 'm4v', 'm4p'],
  imageExt: ['jpg', 'png', 'jpeg', 'gif'],
  assetTypes,
  roles,
  sceneTypes,
  modelTypes,
  appPortals,
  elementActions,
};
