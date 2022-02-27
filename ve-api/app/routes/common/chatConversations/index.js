'use strict';
import { Router } from 'express';
const router = Router();

import { listChatConversations } from '@controllers/common';

router.get('/', listChatConversations);

export { router };
