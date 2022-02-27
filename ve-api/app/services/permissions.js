'use strict';
import models from '@models';
const { permissions: permissionsModel } = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listPermissions = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return permissionsModel.findAndCountAll({
    where,
    order,
    attributes: ['id', 'code', 'name', 'status', 'updatedAt', 'createdAt'],
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
  });
};

const getAllPermissions = () => {
  return permissionsModel.findAll({
    attributes: ['id', 'code', 'name', 'status', 'updatedAt', 'createdAt'],
  });
};

const findOnePermissionByField = (field) => {
  return permissionsModel.findOne({
    where: field,
    attributes: ['id', 'code', 'name', 'status', 'updatedAt', 'createdAt'],
  });
};

const createPermission = (perAttrs) => {
  return permissionsModel.create(perAttrs);
};

const updatePermission = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deletePermission = (instance) => {
  return instance.destroy();
};

export {
  listPermissions,
  findOnePermissionByField,
  createPermission,
  deletePermission,
  updatePermission,
  getAllPermissions,
};
