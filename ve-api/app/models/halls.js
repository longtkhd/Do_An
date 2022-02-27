import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const hall = sequelize.define(databaseConfig.colHalls, {
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
    avatar: {
      type: DataTypes.STRING,
    },
    attributes: {
      type: DataTypes.JSON,
    },
  });
  hall.associate = (models) => {
    hall.belongsTo(models.sceneTemplates, { foreignKey: 'sceneTemplateId' });
    hall.belongsTo(models.lobbies, { foreignKey: 'lobbyId' });
    hall.hasMany(models.sceneAssets);
    hall.belongsToMany(models.booths, {
      through: databaseConfig.colSceneModels,
    });
  };
  return hall;
};
