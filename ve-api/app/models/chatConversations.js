import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const chatConversation = sequelize.define(
    databaseConfig.colChatConversations,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      notificationBooth: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      notificationUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      notificationGuest: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }
  );
  chatConversation.associate = (models) => {
    chatConversation.belongsTo(models.booths, { foreignKey: 'boothId' });
    chatConversation.belongsTo(models.users, { foreignKey: 'userId' });
    chatConversation.hasMany(models.chatMessages);
  };
  return chatConversation;
};
