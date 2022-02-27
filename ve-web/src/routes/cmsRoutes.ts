import { lazy } from 'react';
import {
  LineChartOutlined,
  BarChartOutlined,
  CodeSandboxOutlined,
  UserOutlined,
  LockOutlined,
  TeamOutlined,
  YoutubeOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { IRoute } from '@/interfaces';
import i18n from '@/i18n';

const Dashboard = lazy(() => import('@/containers/Cms/Dashboard'));
const RoleList = lazy(() => import('@/containers/Cms/Roles/RoleList'));
const RoleCreate = lazy(() => import('@/containers/Cms/Roles/RoleCreate'));
const RoleEdit = lazy(() => import('@/containers/Cms/Roles/RoleEdit'));
const RoleDetail = lazy(() => import('@/containers/Cms/Roles/RoleDetail'));
const PermissionList = lazy(() =>
  import('@/containers/Cms/Permissions/PermissionList')
);
const PermissionCreate = lazy(() =>
  import('@/containers/Cms/Permissions/PermissionCreate')
);
const PermissionEdit = lazy(() =>
  import('@/containers/Cms/Permissions/PermissionEdit')
);
// Users
const UserList = lazy(() => import('@/containers/Cms/Users/UserList'));
// Organizers
const OrganizerList = lazy(() =>
  import('@/containers/Cms/Users/Organizers/OrganizerList')
);
const OrganizerCreate = lazy(() =>
  import('@/containers/Cms/Users/Organizers/OrganizerCreate')
);
const OrganizerEdit = lazy(() =>
  import('@/containers/Cms/Users/Organizers/OrganizerEdit')
);
// Booth Owners
const BoothOwnerList = lazy(() =>
  import('@/containers/Cms/Users/BoothOwners/BoothOwnerList')
);
const BoothOwnerCreate = lazy(() =>
  import('@/containers/Cms/Users/BoothOwners/BoothOwnerCreate')
);
const BoothOwnerEdit = lazy(() =>
  import('@/containers/Cms/Users/BoothOwners/BoothOwnerEdit')
);
// 3DScenes
const LobbyBasics = lazy(() =>
  import('@/containers/Cms/3DScenes/Lobby/Basics')
);
const LobbyDesignElements = lazy(() =>
  import('@/containers/Cms/3DScenes/Lobby/DesignElements')
);
const HallList = lazy(() => import('@/containers/Cms/3DScenes/Halls/HallList'));
const HallCreate = lazy(() =>
  import('@/containers/Cms/3DScenes/Halls/HallCreate')
);
const HallEdit = lazy(() => import('@/containers/Cms/3DScenes/Halls/HallEdit'));
const StageList = lazy(() =>
  import('@/containers/Cms/3DScenes/Stages/StageList')
);
const StageCreate = lazy(() =>
  import('@/containers/Cms/3DScenes/Stages/StageCreate')
);
const Landing = lazy(() => import('@/containers/Cms/3DScenes/Landing'));
const StageEdit = lazy(() =>
  import('@/containers/Cms/3DScenes/Stages/StageEdit')
);

// Asset Library
const MediaList = lazy(() =>
  import('@/containers/Cms/AssetLibrary/Medias/MediaList')
);
const MediaCreate = lazy(() =>
  import('@/containers/Cms/AssetLibrary/Medias/MediaCreate')
);
const MediaEdit = lazy(() =>
  import('@/containers/Cms/AssetLibrary/Medias/MediaEdit')
);

const ContentList = lazy(() =>
  import('@/containers/Cms/AssetLibrary/Contents/ContentList')
);
const ContentCreate = lazy(() =>
  import('@/containers/Cms/AssetLibrary/Contents/ContentCreate')
);
const ContentEdit = lazy(() =>
  import('@/containers/Cms/AssetLibrary/Contents/ContentEdit')
);

// Booths
const InfoDeskDesignElements = lazy(() =>
  import('@/containers/Cms/Booths/InfoDesk/DesignElements')
);
const InfoDeskChat = lazy(() =>
  import('@/containers/Cms/Booths/InfoDesk/Chat')
);
const InfoDeskResourceHub = lazy(() =>
  import('@/containers/Cms/Booths/InfoDesk/ResourceHub')
);
const OrganizerBasics = lazy(() =>
  import('@/containers/Cms/Booths/OrganizerBooth/Basics')
);
const OrganizerDesignElements = lazy(() =>
  import('@/containers/Cms/Booths/OrganizerBooth/DesignElements')
);
const OrganizerChat = lazy(() =>
  import('@/containers/Cms/Booths/OrganizerBooth/Chat')
);
const OrganizerResourceHub = lazy(() =>
  import('@/containers/Cms/Booths/OrganizerBooth/ResourceHub')
);
const OwnerBasics = lazy(() =>
  import('@/containers/Cms/Booths/OwnerBooth/Basics')
);
const OwnerDesignElements = lazy(() =>
  import('@/containers/Cms/Booths/OwnerBooth/DesignElements')
);
const OwnerChat = lazy(() => import('@/containers/Cms/Booths/OwnerBooth/Chat'));
const OwnerResourceHub = lazy(() =>
  import('@/containers/Cms/Booths/OwnerBooth/ResourceHub')
);
const StandardBooths = lazy(() =>
  import('@/containers/Cms/Booths/StandardBooths')
);

// Reports
const HallReport = lazy(() => import('@/containers/Cms/Reports/HallReport'));
const InfoDeskReport = lazy(() =>
  import('@/containers/Cms/Reports/InfoDeskReport')
);
const OrganizerBoothReport = lazy(() =>
  import('@/containers/Cms/Reports/OrganizerBoothReport')
);
const StageReport = lazy(() => import('@/containers/Cms/Reports/StageReport'));

/*
 * If route has children, it's a parent menu (not link to any pages)
 * You can change permissions to your IAM's permissions
 */

const routes: IRoute[] = [
  {
    path: '/cms/dashboard',
    title: i18n.t('menu.DASHBOARD'),
    icon: LineChartOutlined,
    component: Dashboard,
  },
  {
    path: '/cms/reports',
    title: i18n.t('menu.REPORTS'),
    icon: BarChartOutlined,
    permissions: [
      'hallReport',
      'inforDeskReport',
      'organizerBoothReport',
      'stageReport',
    ],
    subs: [
      {
        path: '/cms/reports/halls',
        title: i18n.t('menu.HALLS'),
        component: HallReport,
        permissions: ['hallReport'],
      },
      {
        path: '/cms/reports/stage',
        title: i18n.t('menu.STAGES'),
        component: StageReport,
        permissions: ['stageReport'],
      },
      {
        path: '/cms/reports/information-booth',
        title: i18n.t('menu.INFORMATION_BOOTH'),
        component: InfoDeskReport,
        permissions: ['inforDeskReport'],
      },
      {
        path: '/cms/reports/organizer-booth',
        title: i18n.t('menu.ORGANIZER_BOOTH'),
        component: OrganizerBoothReport,
        permissions: ['organizerBoothReport'],
      },
    ],
  },
  {
    path: '/cms/asset-library',
    title: i18n.t('menu.ASSET_LIBRARY'),
    icon: YoutubeOutlined,
    permissions: ['listAssets', 'createAsset'],
    subs: [
      {
        path: '/cms/asset-library/media',
        title: i18n.t('menu.MEDIA'),
        component: MediaList,
        permissions: ['listAssets'],
      },
      {
        path: '/cms/asset-library/media/create',
        title: i18n.t('menu.CREATE_MEDIA'),
        component: MediaCreate,
        hide: true,
        permissions: ['createAsset'],
      },
      {
        path: '/cms/asset-library/media/edit/:id',
        component: MediaEdit,
        hide: true,
        permissions: ['updateAsset', 'detailAsset'],
      },
      {
        path: '/cms/asset-library/content',
        title: i18n.t('menu.CONTENT'),
        component: ContentList,
        permissions: ['listAssets'],
      },
      {
        path: '/cms/asset-library/content/create',
        title: i18n.t('menu.CREATE_MEDIA'),
        component: ContentCreate,
        hide: true,
        permissions: ['createAsset'],
      },
      {
        path: '/cms/asset-library/content/edit/:id',
        component: ContentEdit,
        hide: true,
        permissions: ['updateAsset', 'detailAsset'],
      },
    ],
  },
  {
    path: '/cms/pages',
    title: i18n.t('menu.PAGES'),
    icon: CodeSandboxOutlined,
    subs: [
      {
        path: '/cms/pages/landing',
        title: i18n.t('menu.LANDING_PAGE'),
        component: Landing,
        permissions: ['detailLanding'],
      },
      {
        path: '/cms/pages/lobby',
        title: i18n.t('menu.LOBBY'),
        permissions: ['updateLobby', 'detailLobby'],
        subs: [
          {
            path: '/cms/pages/lobby/basics',
            title: i18n.t('menu.BASICS'),
            component: LobbyBasics,
            permissions: ['updateLobby', 'detailLobby'],
          },
          {
            path: '/cms/pages/lobby/design-elements',
            title: i18n.t('menu.DESIGN_ELEMENTS'),
            component: LobbyDesignElements,
            permissions: ['updateLobby', 'detailLobby'],
          },
        ],
      },
      {
        path: '/cms/pages/halls',
        title: i18n.t('menu.HALLS'),
        component: HallList,
        permissions: ['listHalls'],
      },
      {
        path: '/cms/pages/halls/create',
        component: HallCreate,
        hide: true,
        permissions: ['createHall'],
      },
      {
        path: '/cms/pages/halls/edit/:id',
        component: HallEdit,
        hide: true,
        permissions: ['updateHall', 'detailHall'],
      },
      {
        path: '/cms/pages/stages',
        title: i18n.t('menu.STAGES'),
        component: StageList,
        permissions: ['listStages'],
      },
      {
        path: '/cms/pages/stages/create',
        component: StageCreate,
        hide: true,
        permissions: ['createStage'],
      },
      {
        path: '/cms/pages/stages/edit/:id',
        component: StageEdit,
        hide: true,
        permissions: ['updateStage', 'detailStage'],
      },
    ],
  },
  {
    path: '/cms/booth-management',
    title: i18n.t('menu.BOOTH_MANAGEMENT'),
    icon: BankOutlined,
    subs: [
      {
        path: '/cms/booth-management/owner-booth/basics',
        title: i18n.t('menu.BASICS'),
        component: OwnerBasics,
        permissions: ['updateOwnerBooth', 'detailOwnerBooth'],
      },
      {
        path: '/cms/booth-management/owner-booth/design-elements',
        title: i18n.t('menu.DESIGN_ELEMENTS'),
        component: OwnerDesignElements,
        permissions: ['updateOwnerBooth', 'detailOwnerBooth'],
      },
      {
        path: '/cms/booth-management/owner-booth/chat',
        title: i18n.t('menu.CHAT'),
        component: OwnerChat,
        permissions: ['ownerChat'],
      },
      {
        path: '/cms/booth-management/owner-booth/resources-hub',
        title: i18n.t('menu.RESOURCES_HUB'),
        component: OwnerResourceHub,
        permissions: ['ownerResourcesHub'],
      },
      {
        path: '/cms/booth-management/info-desk',
        title: i18n.t('menu.INFO_DESK'),
        permissions: ['updateInfoDesk', 'detailInfoDesk', 'infoDeskChat'],
        subs: [
          {
            path: '/cms/booth-management/info-desk/design-elements',
            title: i18n.t('menu.DESIGN_ELEMENTS'),
            component: InfoDeskDesignElements,
            permissions: ['updateInfoDesk', 'detailInfoDesk'],
          },
          {
            path: '/cms/booth-management/info-desk/chat',
            title: i18n.t('menu.CHAT'),
            component: InfoDeskChat,
            permissions: ['infoDeskChat'],
          },
          {
            path: '/cms/booth-management/info-desk/resources-hub',
            title: i18n.t('menu.RESOURCES_HUB'),
            component: InfoDeskResourceHub,
            permissions: ['infoDeskResourcesHub'],
          },
        ],
      },
      {
        path: '/cms/booth-management/organizer-booth',
        title: i18n.t('menu.ORGANIZER_BOOTH'),
        permissions: ['updateOrganizerBooth', 'detailOrganizerBooth'],
        subs: [
          {
            path: '/cms/booth-management/organizer-booth/basics',
            title: i18n.t('menu.BASICS'),
            component: OrganizerBasics,
            permissions: ['updateOrganizerBooth', 'detailOrganizerBooth'],
          },
          {
            path: '/cms/booth-management/organizer-booth/design-elements',
            title: i18n.t('menu.DESIGN_ELEMENTS'),
            component: OrganizerDesignElements,
            permissions: ['updateOrganizerBooth', 'detailOrganizerBooth'],
          },
          {
            path: '/cms/booth-management/organizer-booth/chat',
            title: i18n.t('menu.CHAT'),
            component: OrganizerChat,
            permissions: ['organizerChat'],
          },
          {
            path: '/cms/booth-management/organizer-booth/resources-hub',
            title: i18n.t('menu.RESOURCES_HUB'),
            component: OrganizerResourceHub,
            permissions: ['organizerResourcesHub'],
          },
        ],
      },
      {
        path: '/cms/booth-management/standard-booths',
        title: i18n.t('menu.STANDARD_BOOTHS'),
        component: StandardBooths,
        permissions: ['listStandardBooths'],
      },
    ],
  },
  {
    path: '/cms/users',
    title: i18n.t('menu.USER_MANAGEMENT'),
    icon: UserOutlined,
    permissions: ['listAllUsers'],
    subs: [
      {
        path: '/cms/users/list',
        title: i18n.t('menu.USER_LISTING'),
        component: UserList,
        permissions: ['listAllUsers'],
      },
      {
        path: '/cms/users/create',
        title: i18n.t('menu.CREATE_USER'),
      },
    ],
  },
  {
    path: '/cms/users',
    title: i18n.t('menu.USER_MANAGEMENT'),
    icon: UserOutlined,
    permissions: ['listOrganizerUsers'],
    subs: [
      {
        path: '/cms/users/organizers',
        title: i18n.t('menu.ORGANIZERS'),
        component: OrganizerList,
        permissions: ['listOrganizerUsers'],
      },
      {
        path: '/cms/users/organizers/create',
        component: OrganizerCreate,
        hide: true,
        permissions: ['createOrganizerUser'],
      },
      {
        path: '/cms/users/organizers/edit/:id',
        component: OrganizerEdit,
        hide: true,
        permissions: ['updateOrganizerUser'],
      },
      {
        path: '/cms/users/booth-owners',
        title: i18n.t('menu.BOOTH_OWNERS'),
        component: BoothOwnerList,
        permissions: ['listBoothOwnerUsers'],
      },
      {
        path: '/cms/users/booth-owners/create',
        component: BoothOwnerCreate,
        hide: true,
        permissions: ['createBoothOwnerUser'],
      },
      {
        path: '/cms/users/booth-owners/edit/:id',
        component: BoothOwnerEdit,
        hide: true,
        permissions: ['updateBoothOwnerUser'],
      },
    ],
  },
  {
    path: '/cms/roles',
    title: i18n.t('menu.ROLE_MANAGEMENT'),
    icon: TeamOutlined,
    permissions: ['listRoles', 'createRole', 'detailRole', 'updateRole'],
    subs: [
      {
        path: '/cms/roles/list',
        title: i18n.t('menu.ROLE_LISTING'),
        component: RoleList,
        permissions: ['listRoles'],
      },
      {
        path: '/cms/roles/create',
        title: i18n.t('menu.CREATE_ROLE'),
        component: RoleCreate,
        permissions: ['createRole'],
      },
      {
        path: '/cms/roles/edit/:id',
        component: RoleEdit,
        hide: true,
        permissions: ['detailRole', 'updateRole'],
      },
      {
        path: '/cms/roles/:id',
        title: i18n.t('menu.DETAIL_ROLE'),
        component: RoleDetail,
        hide: true,
        permissions: ['detailRole'],
      },
    ],
  },
  {
    path: '/cms/permissions',
    title: i18n.t('menu.PERMISSION_MANAGEMENT'),
    icon: LockOutlined,
    permissions: ['createPermission', 'listPermissions', 'updatePermission'],
    subs: [
      {
        path: '/cms/permissions/list',
        title: i18n.t('menu.PERMISSION_LISTING'),
        component: PermissionList,
        permissions: ['listPermissions'],
      },
      {
        path: '/cms/permissions/create',
        title: i18n.t('menu.CREATE_PERMISSION'),
        component: PermissionCreate,
        permissions: ['createPermission'],
      },
      {
        path: '/cms/permissions/edit/:id',
        component: PermissionEdit,
        hide: true,
        permissions: ['updatePermission'],
      },
    ],
  },
];

export default routes;
