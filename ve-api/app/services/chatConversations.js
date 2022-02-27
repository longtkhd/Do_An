'use strict';
import models from '@models';
const {
  chatConversations: chatConversationsModel,
  booths: boothsModel,
  users: usersModel,
} = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listChatConversations = (
  paginationOptions,
  sortOptions,
  filterOptions
) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return chatConversationsModel.findAndCountAll({
    where,
    order,
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
    include: [
      {
        model: boothsModel,
      },
      {
        model: usersModel,
        attributes: { exclude: ['password'] },
      },
    ],
  });
};

const getAllChatConversations = () => {
  return chatConversationsModel.findAll();
};

const findOneChatConversationByField = (field) => {
  return chatConversationsModel.findOne({
    where: field,
    include: [
      {
        model: boothsModel,
      },
      {
        model: usersModel,
        attributes: { exclude: ['password'] },
      },
    ],
  });
};

const createChatConversation = (perAttrs) => {
  return chatConversationsModel
    .create(perAttrs)
    .then(() => findOneChatConversationByField(perAttrs));
};

const updateChatConversation = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteChatConversation = (instance) => {
  return instance.destroy();
};

export {
  listChatConversations,
  findOneChatConversationByField,
  createChatConversation,
  deleteChatConversation,
  updateChatConversation,
  getAllChatConversations,
};
