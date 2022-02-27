import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const booth = sequelize.define(databaseConfig.colBooths, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aboutUs: {
      type: DataTypes.TEXT,
    },
    attributes: {
      type: DataTypes.JSON,
    },
    websiteUrl: {
      type: DataTypes.STRING,
    },
    calendlyUrl: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['STANDARD', 'INFORMATION', 'ORGANIZER'],
      defaultValue: 'STANDARD',
    },
    avatar: {
      type: DataTypes.STRING,
    },
    meetingUrl: {
      type: DataTypes.STRING,
    },
  });
  booth.associate = (models) => {
    booth.belongsTo(models.sceneTemplates, { foreignKey: 'sceneTemplateId' });
    booth.hasMany(models.sceneAssets);
  };
  return booth;
};
