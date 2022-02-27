'use strict';
import models from '@models';

const {
  rolePermissions: rolePermissionsModel,
  permissions: PermissionsModel,
} = models;

const getRolePermissionsByRoleId = (roleId) => {
  return rolePermissionsModel.findAll({
    where: { roleId },
    include: [
      {
        model: PermissionsModel,
        attributes: ['code'],
      },
    ],
    raw: true,
  });
};

const getPermissionFullInfoByRoleId = (roleId) => {
  return rolePermissionsModel.findAll({
    where: { roleId },
    include: [
      {
        model: PermissionsModel,
        attributes: ['id', 'code', 'name', 'status', 'updatedAt', 'createdAt'],
      },
    ],
  });
};

const deleteMultiRolePermissions = (whereCondition) => {
  return rolePermissionsModel.destroy({
    where: whereCondition,
  });
};

const createMultiRolePermissions = (obj) => {
  return rolePermissionsModel.bulkCreate(obj);
};

export {
  getRolePermissionsByRoleId,
  getPermissionFullInfoByRoleId,
  deleteMultiRolePermissions,
  createMultiRolePermissions,
};
