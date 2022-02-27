'use strict';
import { Router } from 'express';
const router = Router();

import {
  listStages,
  createStage,
  detailStage,
  updateStage,
  deleteStage,
  getAllStages,
} from '@controllers/cms';

/**
 * Editing profile
 * @route GET /stages
 * @group Stage - Stage operation
 * @param {string} pageSize.query
 * @param {string} page.query
 * @param {string} searchValue.query
 * @param {string} searchKey.query
 * @param {string} sortField.query
 * @param {string} sortType.query
 * @param {string} filterKey.query
 * @param {string} filterValue.query
 * @returns {object} 200 - Successful getting
 * @returns {Error}  default - Unexpected error
 */
router.get('/', listStages);
router.get('/all', getAllStages);
router.get('/:id', detailStage);
router.post('/', createStage);
router.put('/:id', updateStage);
router.delete('/:id', deleteStage);

export { router };
