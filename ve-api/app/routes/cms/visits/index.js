'use strict';
import { Router } from 'express';
const router = Router();

import { getVisitSummary, getVisitByTime } from '@controllers/cms';

router.get('/summary', getVisitSummary);
router.get('/by-time', getVisitByTime);

export { router };
