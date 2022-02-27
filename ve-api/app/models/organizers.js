import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const organizer = sequelize.define(databaseConfig.colOrganizers, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['ACTIVE', 'INACTIVE'],
      defaultValue: 'ACTIVE',
    },
  });
  organizer.associate = (models) => {
    organizer.belongsTo(models.lobbies, { foreignKey: 'lobbyId' });
    organizer.belongsTo(models.booths, { foreignKey: 'boothId' });
    organizer.belongsTo(models.landings, { foreignKey: 'landingId' });
    organizer.belongsTo(models.booths, { foreignKey: 'infoDeskId' });
  };
  return organizer;
};
