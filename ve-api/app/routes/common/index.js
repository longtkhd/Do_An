import express from 'express';
const router = express.Router();

import chatRouter from './chat';
import { router as authRouter } from './auth';
import { router as chatConversationRouter } from './chatConversations';
import { router as chatMessageRouter } from './chatMessages';

export default function (io) {
  router.use('/chat', chatRouter(io));
  router.use('/auth', authRouter);
  router.use('/chat-conversations', chatConversationRouter);
  router.use('/chat-messages', chatMessageRouter);
  return router;
}
