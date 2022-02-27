import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const sceneTemplate = sequelize.define(databaseConfig.colSceneTemplates, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['ACTIVE', 'INACTIVE'],
      defaultValue: 'ACTIVE',
    },
    sceneType: {
      type: DataTypes.ENUM,
      values: ['BOOTH', 'LOBBY', 'HALL', 'INFORMATION_BOOTH'],
      defaultValue: 'BOOTH',
    },
    attributes: {
      type: DataTypes.JSON,
    },
    thumb: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.JSON,
    },
  });
  return sceneTemplate;
};
