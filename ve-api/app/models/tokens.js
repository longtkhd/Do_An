import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const token = sequelize.define(databaseConfig.colTokens, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: databaseConfig.colUsers,
        key: 'id',
      },
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  token.associate = (models) => {
    token.belongsTo(models.users, { foreignKey: 'userId', onDelete: "cascade" });
  };
  return token;
};
