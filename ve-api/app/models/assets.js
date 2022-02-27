import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const asset = sequelize.define(databaseConfig.colAssets, {
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
    type: {
      type: DataTypes.ENUM,
      values: ['MEDIA', 'CONTENT', 'URL'],
      defaultValue: 'MEDIA',
    },
    value: {
      type: DataTypes.TEXT,
    },
  });
  asset.associate = (models) => {
    asset.belongsTo(models.booths, { foreignKey: 'boothId' });
  };
  return asset;
};
