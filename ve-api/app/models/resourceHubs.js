import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const resourceHub = sequelize.define(databaseConfig.colResourceHubs, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['ACTIVE', 'INACTIVE'],
      defaultValue: 'ACTIVE',
    },
  });
  resourceHub.associate = (models) => {
    resourceHub.belongsTo(models.booths, { foreignKey: 'boothId' });
    resourceHub.belongsTo(models.assets, { foreignKey: 'assetId' });
  };
  return resourceHub;
};
