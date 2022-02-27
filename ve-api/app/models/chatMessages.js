import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const chatMessage = sequelize.define(databaseConfig.colChatMessages, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['MESSAGE', 'IMAGE', 'VIDEO', 'FILE'],
      defaultValue: 'MESSAGE',
    },
    message: {
      type: DataTypes.STRING,
    },
    readed: {
      type: DataTypes.JSON,
    },
    src: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.INTEGER,
    },
  });
  chatMessage.associate = (models) => {
    chatMessage.belongsTo(models.chatConversations, {
      foreignKey: 'chatConversationId',
    });
    chatMessage.belongsTo(models.users, { foreignKey: 'userId' });
  };
  return chatMessage;
};
