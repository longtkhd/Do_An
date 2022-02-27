'use strict';
import models from '@models';
const { routes: routesModel, permissions: permissionsModel } = models;
const attrs = [
  'id',
  'name',
  'method',
  'permissionId',
  'regexUri',
  'status',
  'updatedAt',
  'createdAt',
];

const listRoutesIncludePermission = () => {
  return routesModel.findAll({
    attributes: attrs,
    include: {
      model: permissionsModel,
      attributes: ['id', 'code', 'name'],
    },
  });
};

const findOneRouteByField = (field) => {
  return routesModel.findOne({
    where: field,
  });
};

const findOneRouteByFieldIncludePermission = (field) => {
  return routesModel.findOne({
    where: field,
    attributes: attrs,
    include: {
      model: permissionsModel,
      attributes: ['id', 'code', 'name'],
    },
  });
};

const createRoute = (routeAttrs) => {
  return routesModel.create(routeAttrs);
};

const deleteRoute = (instance) => {
  return instance.destroy();
};

export {
  listRoutesIncludePermission,
  findOneRouteByField,
  findOneRouteByFieldIncludePermission,
  createRoute,
  deleteRoute,
};
