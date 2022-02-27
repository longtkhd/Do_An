'use strict';
import { Router } from 'express';
const router = Router();

import {
  listResourceHubs,
  createResourceHub,
  detailResourceHub,
  deleteResourceHub,
  getAllResourceHubs,
} from '@controllers/cms';

router.get('/', listResourceHubs);
router.get('/all', getAllResourceHubs);
router.get('/:id', detailResourceHub);
router.post('/', createResourceHub);
router.delete('/:id', deleteResourceHub);

export { router };
