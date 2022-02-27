import { lazy } from 'react';
import { IRoute } from '@/interfaces';

const Home = lazy(() => import('@/containers/MainSite/Home'));
const Lobby = lazy(() => import('@/containers/MainSite/Lobby'));
const Hall = lazy(() => import('@/containers/MainSite/Hall'));
const Booth = lazy(() => import('@/containers/MainSite/Booth'));
const MainStage = lazy(() => import('@/containers/MainSite/MainStage'));
/*
 * If route has children, it's a parent menu (not link to any pages)
 * You can change permissions to your IAM's permissions
 */

const routes: IRoute[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/lobby',
    component: Lobby,
    authorize: true,
  },
  {
    path: '/hall/:hallId/booth/:id',
    component: Booth,
    authorize: true,
  },
  {
    path: '/hall/:id',
    component: Hall,
    authorize: true,
  },
  {
    path: '/mainstage/:id',
    component: MainStage,
    authorize: true,
  },
  {
    path: '/booth/:id',
    component: Booth,
    authorize: true,
  },
];

export default routes;
