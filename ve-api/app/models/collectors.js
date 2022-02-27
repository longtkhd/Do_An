import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const collector = sequelize.define(databaseConfig.colCollectors, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    collector: {
      type: DataTypes.JSON,
    },
  });
  collector.associate = (models) => {
    collector.belongsTo(models.booths, { foreignKey: 'boothId' });
    collector.belongsTo(models.halls, { foreignKey: 'hallId' });
    collector.belongsTo(models.stages, { foreignKey: 'stageId' });
    collector.belongsTo(models.users, { foreignKey: 'userId' });
  };
  return collector;
};
