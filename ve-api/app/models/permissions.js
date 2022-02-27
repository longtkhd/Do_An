import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const permission = sequelize.define(databaseConfig.colPermissions, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
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
  permission.associate = function (models) {
    permission.belongsTo(models.roles, {
      through: databaseConfig.colRoles,
      foreignKey: 'roleId',
    });
  };
  return permission;
};
