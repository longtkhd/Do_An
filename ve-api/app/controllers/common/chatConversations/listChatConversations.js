import { VALIDATOR } from '@constants';
import { query } from 'express-validator';
import getParam from '@helpers/params';
import * as chatConversationsService from '@services/chatConversations';
import * as chatMessagesService from '@services/chatMessages';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
  paginationData,
} from '@helpers/response';
import { loadUserToRequest } from '@helpers/jwt';
import { cloneDeep } from 'lodash';

const validator = [
  query('pageSize')
    .exists()
    .withMessage(VALIDATOR.PAGE_NULL)
    .isInt({ min: 1 })
    .withMessage(VALIDATOR.PAGE_GREATER_ONE),
  query('page')
    .exists()
    .withMessage(VALIDATOR.PAGE_NULL)
    .isInt({ min: 1 })
    .withMessage(VALIDATOR.PAGE_GREATER_ONE),
];
export default [
  loadUserToRequest(),
  validator,
  async (req, res) => {
    try {
      const sortOptions = [
        {
          sort: getParam(req.query, 'sort', 'updatedAt'),
          order: getParam(req.query, 'order', 'descend'),
        },
      ];
      const filterOptions = [
        {
          columnId: 'boothId',
          value: getParam(req.query, 'boothId'),
        },
        {
          columnId: 'userId',
          value: getParam(req.query, 'userId'),
        },
      ];
      const paginationOptions = {
        pageSize: parseInt(getParam(req.query, 'pageSize', '20')),
        page: parseInt(getParam(req.query, 'page', '1')),
      };
      const {
        count: total,
        rows,
      } = await chatConversationsService.listChatConversations(
        paginationOptions,
        sortOptions,
        filterOptions
      );

      const chatConversations = await Promise.all(
        rows.map(async (chatConversation) => {
          const newChatConversation = cloneDeep(chatConversation.toJSON());
          newChatConversation.lastMessage = await chatMessagesService.findOneChatMessageByField(
            {
              chatConversationId: chatConversation.id,
            }
          );
          return newChatConversation;
        })
      ).then((res) =>
        res
          .filter((r) => r.lastMessage)
          .sort(
            (a, b) =>
              new Date(b.lastMessage.createdAt) -
              new Date(a.lastMessage.createdAt)
          )
      );

      const dataSuccess = successData(
        paginationData(chatConversations, { ...paginationOptions, total })
      );
      return buildSuccessResponse(res, dataSuccess);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
