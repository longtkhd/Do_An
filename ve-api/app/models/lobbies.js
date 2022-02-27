import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const lobby = sequelize.define(databaseConfig.colLobbies, {
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
    welcomeMsg: {
      type: DataTypes.TEXT,
    },
    data: {
      type: DataTypes.JSON,
    },
    attributes: {
      type: DataTypes.JSON,
    },
    isWelcomeMsgVisble: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    welcomeMsgTitle: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
    },
    favicon: {
      type: DataTypes.STRING,
    },
    siteTitle: {
      type: DataTypes.STRING,
    },
    infoBoothButton: {
      type: DataTypes.STRING,
    },
    organizerBoothButton: {
      type: DataTypes.STRING,
    },
  });
  lobby.associate = (models) => {
    lobby.belongsTo(models.sceneTemplates, { foreignKey: 'sceneTemplateId' });
    lobby.hasMany(models.sceneAssets);
    lobby.belongsToMany(models.halls, {
      through: databaseConfig.colSceneModels,
    });
    lobby.belongsToMany(models.stages, {
      through: databaseConfig.colSceneModels,
    });
    lobby.belongsToMany(models.booths, {
      through: databaseConfig.colSceneModels,
    });
  };
  return lobby;
};
