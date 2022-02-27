'use strict';
import { Router } from 'express';
import { COMMON_CODE } from '@constants/codes';
import { systemConfig, redisConfig } from '@configs';
import { verifyJwtToken } from '@helpers/jwt';
import redisConnect from '@helpers/redis';
import redisAdapter from 'socket.io-redis';
import * as usersService from '@services/users';
import * as chatConversationsService from '@services/chatConversations';
import * as chatMessagesService from '@services/chatMessages';
import * as organizersService from '@services/organizers';
import * as visitsService from '@services/visits';
import * as collectorsService from '@services/collectors';
import { cloneDeep } from 'lodash';

const router = Router();

export default function (io) {
  const redisClient = redisConnect.getConnection(
    redisConfig.host,
    redisConfig.port,
    redisConfig.database
  );

  redisClient.on('connect', () => {
    console.log('Connected to Redis!');
  });

  redisClient.on('error', () => {
    console.log('Something went wrong with Redis!');
  });

  redisClient.flushdb((err, succeeded) => {
    console.log('Delete cache', succeeded);
  });

  io.adapter(
    redisAdapter({
      host: redisConfig.host,
      port: redisConfig.port,
      db: redisConfig.database,
    })
  );

  io.use(async (socket, next) => {
    const accessToken = socket.handshake.headers['authorization'];
    if (accessToken) {
      const jwtToken = accessToken.split(' ');
      if (jwtToken.length > 1 && jwtToken[1]) {
        const bearerToken = jwtToken[1];
        try {
          const decoded = await verifyJwtToken(
            bearerToken,
            systemConfig.accessTokenSecret
          );
          if (decoded && decoded.userId) {
            await redisClient.set(decoded.userId, socket.id);
            socket.userId = decoded.userId;
            socket.startTime = new Date();
            return next();
          }
        } catch (e) {
          return next(new Error(COMMON_CODE.INVALID_ACCESS_TOKEN));
        }
      }
    }
  });
  io.on('connection', function (socket) {
    console.log('connection');

    socket.on('disconnect', async () => {
      console.log('disconnect');
      const endTime = new Date();
      const user = await usersService.findOneUserByField({ id: socket.userId });
      const timeSession =
        endTime.getTime() -
        socket.startTime.getTime() +
        Number(user.timeSession);
      await usersService.updateUser(user, {
        timeSession,
        lastActivity: socket.startTime,
      });
      console.log(redisClient.get(socket.userId));
      redisClient.del(socket.userId);
    });

    socket.on('START_CONVERSATION', async (payload) => {
      const { userId, boothId } = payload;
      let conversation = await chatConversationsService.findOneChatConversationByField(
        {
          userId,
          boothId,
        }
      );
      if (!conversation) {
        conversation = await chatConversationsService.createChatConversation({
          userId,
          boothId,
        });
      }
      //Join the Socket room (room name is the conversationId)
      socket.join(conversation.id);
      socket.emit('START_CONVERSATION', { conversation: conversation });
    });

    socket.on('FETCH_CONVERSATIONS', async (payload) => {
      const { boothId, userId, limit } = payload;
      const sortOptions = [
        {
          sort: 'updatedAt',
          order: 'descend',
        },
      ];
      const filterOptions = boothId
        ? [
            {
              columnId: 'boothId',
              value: boothId,
            },
          ]
        : [
            {
              columnId: 'userId',
              value: userId,
            },
          ];
      const paginationOptions = {
        pageSize: limit,
        page: 1,
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

      socket.emit('FETCH_CONVERSATIONS', { chatConversations });
    });

    socket.on('FETCH_MESSAGES', async (payload) => {
      const { conversationId, limit } = payload;
      const sortOptions = [
        {
          sort: 'createdAt',
          order: 'descend',
        },
      ];
      const filterOptions = [
        {
          columnId: 'chatConversationId',
          value: conversationId,
        },
      ];
      const paginationOptions = {
        pageSize: limit,
        page: 1,
      };
      const {
        count: totalMessages,
        rows,
      } = await chatMessagesService.listChatMessages(
        paginationOptions,
        sortOptions,
        filterOptions
      );
      const messages = rows.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      socket.emit('FETCH_MESSAGES', { messages, totalMessages });
    });

    socket.on('JOIN_ROOM', async (payload) => {
      const { conversationId, portal } = payload;
      const conversation = await chatConversationsService.findOneChatConversationByField(
        {
          id: conversationId,
        }
      );
      socket.join(conversationId);
      await chatConversationsService.updateChatConversation(conversation, {
        ...(portal === systemConfig.appPortals.MAINSITE
          ? { notificationUser: false }
          : { notificationBooth: false }),
      });
    });

    socket.on('SEND_MESSAGE', async (payload) => {
      const {
        message,
        chatConversationId,
        userId,
        type,
        tempId,
        src,
        size,
        portal,
      } = payload;
      const senderUser = await usersService.findOneUserByField({ id: userId });
      const newMessage = await chatMessagesService.createChatMessage({
        message,
        chatConversationId,
        userId,
        src,
        type,
        size,
      });

      const totalMessages = await chatMessagesService.countMessageByField({
        chatConversationId,
      });

      newMessage.tempId = tempId;
      const conversation = await chatConversationsService.findOneChatConversationByField(
        {
          id: chatConversationId,
        }
      );
      const booth = conversation.booth;
      // Send message to booth or to all user in organizer
      let users = [conversation.user.toJSON()];
      if (['INFORMATION', 'ORGANIZER'].includes(booth.type)) {
        const organizer = await organizersService.findOneOrganizerByField({
          ...(booth.type === 'INFORMATION'
            ? {
                infoDeskId: booth.id,
              }
            : {
                boothId: booth.id,
              }),
        });
        const organizerUsers = await usersService.findAllUserByField({
          organizerId: organizer.id,
        });
        organizerUsers.map((user) => {
          if (!users.find((o) => o.id === user.id)) {
            users.push(user);
          }
        });
      }
      users = users.filter((user) => user.id !== socket.userId);
      users.forEach((user) => {
        redisClient.get(user.id, async (e, data) => {
          await chatConversationsService.updateChatConversation(conversation, {
            ...(portal === systemConfig.appPortals.MAINSITE
              ? { notificationBooth: true }
              : { notificationUser: true }),
          });
          if (totalMessages === 1) {
            socket.to(data).emit('TRIGGER_FETCH_CONVERSATIONS', {
              message: newMessage,
              conversationId: chatConversationId,
            });
          }
          if (data) {
            // User online
            socket.to(data).emit('UPDATE_CONVERSATION', {
              message: newMessage,
              conversationId: chatConversationId,
            });
            socket.to(data).emit('UPDATE_CONVERSATION_NOTIFICATION', {
              message: newMessage,
              conversationId: chatConversationId,
              user: senderUser,
              boothType: booth.type,
            });
          } else {
            // User offline
            if (user.roleId) {
              // Send mail to admin
            } else {
              // Send mail to user
            }
          }
        });
      });
      socket.emit('SEND_MESSAGE', { message: newMessage });
      socket.emit('UPDATE_CONVERSATION', {
        message: newMessage,
        conversationId: chatConversationId,
      });
      socket.to(chatConversationId).emit('RECEIVE_MESSAGE', {
        message: newMessage,
        conversationId: chatConversationId,
      });
    });

    socket.on('ADD_MESSAGE_NOTIFICATION', async (payload) => {
      const { conversationId, portal } = payload;
      const conversation = await chatConversationsService.findOneChatConversationByField(
        {
          id: conversationId,
        }
      );
      await chatConversationsService.updateChatConversation(conversation, {
        ...(portal === systemConfig.appPortals.MAINSITE
          ? { notificationUser: false }
          : { notificationBooth: false }),
      });
    });

    socket.on('VISIT', async (payload) => {
      console.log(payload);
      const { userId, device, stageId, hallId, boothId } = payload;
      await visitsService.createVisit({
        ...(userId && {
          userId,
        }),
        ...(stageId && {
          stageId,
        }),
        ...(boothId && {
          boothId,
        }),
        ...(hallId && {
          hallId,
        }),
        ...(device && {
          device,
        }),
      });
    });

    socket.on('ADD_TIMER_COLLECTOR', async (payload) => {
      const { count, userId, boothId, hallId, stageId } = payload;
      console.log(payload);
      const sceneId = boothId || hallId || stageId;
      const sceneIdKey = boothId ? 'boothId' : hallId ? 'hallId' : 'stageId';
      let existedCollector = await collectorsService.findOneCollectorByField({
        userId,
        [sceneIdKey]: sceneId,
      });
      if (!existedCollector) {
        existedCollector = await collectorsService.createCollector({
          userId,
          [sceneIdKey]: sceneId,
          collector: {},
        });
      }
      const collector = existedCollector.collector;
      if (collector['timeSpent']) {
        collector['timeSpent'] = {
          name: collector['timeSpent'].name,
          count: collector['timeSpent'].count + count,
        };
      } else {
        collector['timeSpent'] = {
          name: 'Total Time Spent',
          count: count,
        };
      }

      if (collector['timesVisited']) {
        collector['timesVisited'] = {
          name: collector['timesVisited'].name,
          count: collector['timesVisited'].count + 1,
        };
      } else {
        collector['timesVisited'] = {
          name: 'Total Times Visited',
          count: 1,
        };
      }
      await collectorsService.updateCollector(existedCollector, { collector });
    });

    socket.on('ADD_CLICK_COLLECTOR', async (payload) => {
      const { type, name, userId, boothId, hallId, stageId } = payload;
      const sceneId = boothId || hallId || stageId;
      const sceneIdKey = boothId ? 'boothId' : hallId ? 'hallId' : 'stageId';
      let existedCollector = await collectorsService.findOneCollectorByField({
        userId,
        [sceneIdKey]: sceneId,
      });
      if (!existedCollector) {
        existedCollector = await collectorsService.createCollector({
          userId,
          [sceneIdKey]: sceneId,
          collector: {
            timesVisited: {
              name: 'Total Times Visited',
              count: 1,
            },
          },
        });
      }
      const collector = existedCollector.collector;
      if (collector[type]) {
        collector[type] = {
          name: collector[type].name,
          count: collector[type].count + 1,
        };
      } else {
        collector[type] = {
          name,
          count: 1,
        };
      }
      await collectorsService.updateCollector(existedCollector, { collector });
    });
  });

  return router;
}
