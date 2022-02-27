import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const sceneAsset = sequelize.define(databaseConfig.colSceneAssets, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  sceneAsset.associate = (models) => {
    sceneAsset.belongsTo(models.lobbies, { foreignKey: 'lobbyId' });
    sceneAsset.belongsTo(models.booths, { foreignKey: 'boothId' });
    sceneAsset.belongsTo(models.halls, { foreignKey: 'hallId' });
    sceneAsset.belongsTo(models.stages, { foreignKey: 'stageId' });
    sceneAsset.belongsTo(models.assets, { foreignKey: 'assetId' });
  };
  return sceneAsset;
};
