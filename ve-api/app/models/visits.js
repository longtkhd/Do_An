import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const visit = sequelize.define(databaseConfig.colVisits, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    device: {
      type: DataTypes.ENUM,
      values: ['MOBILE', 'BROWSER'],
      defaultValue: 'BROWSER',
    },
  });
  visit.associate = (models) => {
    visit.belongsTo(models.booths, { foreignKey: 'boothId' });
    visit.belongsTo(models.users, { foreignKey: 'userId' });
    visit.belongsTo(models.halls, { foreignKey: 'hallId' });
    visit.belongsTo(models.stages, { foreignKey: 'stageId' });
  };
  return visit;
};
