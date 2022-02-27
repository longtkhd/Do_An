'use strict';
import { Router } from 'express';
const router = Router();

import {
  listAssets,
  createAsset,
  detailAsset,
  deleteAsset,
  updateAsset,
} from '@controllers/cms';

router.get('/', listAssets);
router.get('/:id', detailAsset);
router.post('/', createAsset);
router.delete('/:id', deleteAsset);
router.put('/:id', updateAsset);

export { router };
