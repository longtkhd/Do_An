'use strict';
import { Router } from 'express';
const router = Router();

import {
  listPermissions,
  createPermission,
  detailPermission,
  deletePermission,
  updatePermission,
} from '@controllers/cms';

router.get('/', listPermissions);
router.get('/:id', detailPermission);
router.post('/', createPermission);
router.delete('/:id', deletePermission);
router.put('/:id', updatePermission);

export { router };
