import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const landing = sequelize.define(databaseConfig.colLandings, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['ACTIVE', 'INACTIVE'],
      defaultValue: 'ACTIVE',
    },
    description: {
      type: DataTypes.TEXT,
    },
    background: {
      type: DataTypes.STRING,
    },
    button: {
      type: DataTypes.STRING,
    },
    isAllowLogin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    disableLoginMessage: {
      type: DataTypes.TEXT,
    },
  });
  return landing;
};
