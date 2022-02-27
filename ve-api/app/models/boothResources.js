import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const boothResource = sequelize.define(databaseConfig.colBoothResources, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['MEDIA', 'CONTENT', 'URL'],
      defaultValue: 'MEDIA',
    },
    value: {
      type: DataTypes.TEXT,
    },
  });
  boothResource.associate = (models) => {
    boothResource.belongsTo(models.booths, { foreignKey: 'boothId' });
  };
  return boothResource;
};
