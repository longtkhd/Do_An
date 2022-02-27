'use strict';
import models from '@models';
const {
  chatMessages: chatMessagesModel,
  chatConversations: chatConversationsModel,
  users: usersModel,
} = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listChatMessages = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return chatMessagesModel.findAndCountAll({
    where,
    order,
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
  });
};

const getAllChatMessages = () => {
  return chatMessagesModel.findAll();
};

const findOneChatMessageByField = (field) => {
  return chatMessagesModel.findOne({
    where: field,
    order: [['createdAt', 'desc']],
    include: [
      {
        model: chatConversationsModel,
      },
      {
        model: usersModel,
        attributes: { exclude: ['password'] },
      },
    ],
  });
};

const countMessageByField = (field) => {
  return chatMessagesModel.count({
    where: field,
  });
};

const createChatMessage = (perAttrs) => {
  return chatMessagesModel
    .create(perAttrs)
    .then(() => findOneChatMessageByField(perAttrs));
};

const updateChatMessage = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteChatMessage = (instance) => {
  return instance.destroy();
};

export {
  listChatMessages,
  findOneChatMessageByField,
  createChatMessage,
  deleteChatMessage,
  updateChatMessage,
  getAllChatMessages,
  countMessageByField,
};
