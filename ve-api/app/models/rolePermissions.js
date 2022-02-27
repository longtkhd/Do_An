import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const rolePermission = sequelize.define(databaseConfig.colRolePermissions, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    permissionId: {
      type: DataTypes.INTEGER,
      references: {
        model: databaseConfig.colPermissions,
        key: 'id',
      },
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: databaseConfig.colRoles,
        key: 'id',
      },
      allowNull: false,
    },
  });
  rolePermission.associate = function (models) {
    rolePermission.belongsTo(models.permissions, {
      through: databaseConfig.colPermissions,
      foreignKey: 'permissionId',
    });
    rolePermission.belongsTo(models.roles, {
      through: databaseConfig.colRoles,
      foreignKey: 'roleId',
    });
  };
  return rolePermission;
};
