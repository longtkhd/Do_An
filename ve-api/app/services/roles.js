'use strict';
import models from '@models';
const { roles: rolesModel } = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listRoles = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return rolesModel.findAndCountAll({
    where,
    order,
    attributes: ['id', 'name', 'roleAcp', 'status', 'updatedAt', 'createdAt'],
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
  });
};

const getRoleById = (id) => {
  return rolesModel.findOne({ where: { id } });
};

const getAllRoles = () => {
  return rolesModel.findAll({
    attributes: ['id', 'roleAcp', 'name'],
  });
};

const initialRoles = async () => {
  const roleSuperAdmin = {
    roleAcp: true,
    name: 'Super Admin',
  };
  try {
    await rolesModel.create(roleSuperAdmin);
  } catch (err) {
    console.log(err);
  }
};

const findOneRoleByField = (field) => {
  return rolesModel.findOne({
    where: field,
  });
};

const createRole = (roleAttrs) => {
  return rolesModel.create(roleAttrs);
};

const updateRole = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteRole = (instance) => {
  return instance.destroy();
};

const findAllRoleByField = (field) => {
  return rolesModel.findAll({
    where: field,
    raw: true,
  });
};

const deleteManyRole = (whereCondition) => {
  return rolesModel.destroy({ where: whereCondition });
};

export {
  listRoles,
  getAllRoles,
  initialRoles,
  getRoleById,
  findOneRoleByField,
  createRole,
  updateRole,
  deleteRole,
  findAllRoleByField,
  deleteManyRole,
};
