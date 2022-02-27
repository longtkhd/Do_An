'use strict';
import { Router } from 'express';
const router = Router();

import { getCollectorSummary, listCollectors } from '@controllers/cms';

router.get('/', listCollectors);
router.get('/summary/:sceneIdKey/:sceneId', getCollectorSummary);

export { router };
