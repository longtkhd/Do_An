import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const sceneModel = sequelize.define(databaseConfig.colSceneModels, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  sceneModel.associate = (models) => {
    sceneModel.belongsTo(models.lobbies, { foreignKey: 'lobbyId' });
    sceneModel.belongsTo(models.booths, { foreignKey: 'boothId' });
    sceneModel.belongsTo(models.halls, { foreignKey: 'hallId' });
    sceneModel.belongsTo(models.stages, { foreignKey: 'stageId' });
  };
  return sceneModel;
};
