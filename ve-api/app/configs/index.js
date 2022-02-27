import dotenv from 'dotenv';
dotenv.config();
const databaseConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DIALECT,
  colUsers: 'users',
  colRoles: 'roles',
  colTokens: 'tokens',
  colPermissions: 'permissions',
  colRoutes: 'routes',
  colRolePermissions: 'rolePermissions',
  colSceneTemplates: 'sceneTemplates',
  colLobbies: 'lobbies',
  colBooths: 'booths',
  colAssets: 'assets',
  colSceneAssets: 'sceneAssets',
  colHalls: 'halls',
  colBoothResources: 'boothResources',
  colStages: 'stages',
  colSceneModels: 'sceneModels',
  colLandings: 'landings',
  colOrganizers: 'organizers',
  colChatConversations: 'chatConversations',
  colChatMessages: 'chatMessages',
  colVisits: 'visits',
  colResourceHubs: 'resourceHubs',
  colCollectors: 'collectors',
};

const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  database: process.env.REDIS_DB,
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

const boothTypes = {
  STANDARD: 'STANDARD',
  INFORMATION: 'INFORMATION',
  ORGANIZER: 'ORGANIZER',
};

const appPortals = {
  MAINSITE: 'MAINSITE',
  CMS: 'CMS',
};

const systemConfig = {
  FE_URL: process.env.FE_URL,
  HOST_MAIL: process.env.HOST_MAIL,
  HOST_MAIL_PASS: process.env.HOST_MAIL_PASS,
  ADMIN_MAIL: 'phihoan10@gmail.com',
  prefixApiCommon: '/api/v1/common',
  prefixApiSite: '/api/v1',
  prefixApiCms: '/api/v1/cms',
  accessTokenSecret: 'UET_VITUAL_EVENT_ACCESS_TOKEN',
  refreshTokenSecret: 'UET_VITUAL_EVENT_REFRESH_TOKEN',
  accessTokenExpiredTime: 15 * 60,
  refreshTokenExpiredTime: 7 * 24 * 60 * 60,
  bucket: {
    endpoint: 'https://sgp1.digitaloceanspaces.com',
    accessKeyId: '',
    secretAccessKey: '',
    region: 'ap-southeast-1',
  },
  BUCKET_NAME: 'virtualevent',
  bucketPath: 'https://virtualevent.sgp1.cdn.digitaloceanspaces.com',
  roles,
  sceneTypes,
  boothTypes,
  appPortals,
};

export { databaseConfig, systemConfig, redisConfig };
