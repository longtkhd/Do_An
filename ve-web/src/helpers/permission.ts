import { IRole, IRoute } from '@/interfaces';
import { intersection } from 'lodash';

export const availableRoutes = (
  routes: IRoute[],
  permissions: String[] = [],
  role: IRole = {} as IRole
): IRoute[] => {
  let resultNav: IRoute[] = [];
  // if (role.roleAcp) {
  //   return routes;
  // }
  routes.forEach(item => {
    if (!item.hasOwnProperty('permissions')) {
      if (item.hasOwnProperty('subs')) {
        const { subs } = item;
        let newSubs: IRoute[] = [];
        subs?.map(ele => {
          if (!ele.hasOwnProperty('permissions')) {
            newSubs.push(ele);
          } else {
            const { permissions: curr } = ele;
            if (intersection(curr, permissions).length) {
              newSubs.push(ele);
            }
          }
        });
        item.subs = newSubs;
      }
      resultNav.push(item);
    } else {
      const { permissions: curr } = item;
      if (intersection(curr, permissions).length) {
        if (item.hasOwnProperty('subs')) {
          const { subs } = item;
          let newSubs: IRoute[] = [];
          subs?.map(ele => {
            if (!ele.hasOwnProperty('permissions')) {
              newSubs.push(ele);
            } else {
              const { permissions: deepCurr } = ele;
              if (intersection(deepCurr, permissions).length) {
                newSubs.push(ele);
              }
            }
          });
          item.subs = newSubs;
        }
        resultNav.push(item);
      }
    }
  });
  return resultNav;
};
