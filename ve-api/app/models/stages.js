import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const stage = sequelize.define(databaseConfig.colStages, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    description: {
      type: DataTypes.TEXT,
    },
    zoomMeeting: {
      type: DataTypes.JSON,
    },
    attributes: {
      type: DataTypes.JSON,
    },
    centreScreenUrl: {
      type: DataTypes.STRING,
    },
    bannerLeftUrl: {
      type: DataTypes.STRING,
    },
    bannerRightUrl: {
      type: DataTypes.STRING,
    },
    youtubeUrl: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['ZOOM', 'IMAGE', 'VIDEO', 'YOUTUBE'],
      defaultValue: 'IMAGE',
    },
  });
  stage.associate = (models) => {
    stage.belongsTo(models.sceneTemplates, { foreignKey: 'sceneTemplateId' });
    stage.belongsTo(models.lobbies, { foreignKey: 'lobbyId' });
    stage.hasMany(models.sceneAssets);
  };
  return stage;
};
