import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const role = sequelize.define(databaseConfig.colRoles, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleAcp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['ACTIVE', 'INACTIVE'],
      defaultValue: 'ACTIVE',
    },
  });
  role.associate = function (models) {
    role.hasMany(models.users);
    role.hasMany(models.rolePermissions);
  };
  return role;
};
