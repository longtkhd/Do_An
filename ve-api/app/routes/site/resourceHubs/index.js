'use strict';
import { Router } from 'express';
const router = Router();

import {
  getAllResourceHubs,
  downloadResourceHub,
} from '@controllers/main-site';

router.get('/all', getAllResourceHubs);
router.get('/download/:id', downloadResourceHub);

export { router };
