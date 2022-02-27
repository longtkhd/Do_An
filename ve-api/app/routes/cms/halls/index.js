'use strict';
import { Router } from 'express';
const router = Router();

import {
  listHalls,
  createHall,
  detailHall,
  updateHall,
  deleteHall,
  getAllHalls,
} from '@controllers/cms';

/**
 * Editing profile
 * @route GET /halls
 * @group Hall - Hall operation
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
router.get('/', listHalls);
router.get('/all', getAllHalls);
router.get('/:id', detailHall);
router.post('/', createHall);
router.put('/:id', updateHall);
router.delete('/:id', deleteHall);

export { router };
