'use strict';
import { Router } from 'express';
const router = Router();

import {
  listBooths,
  createBooth,
  detailBooth,
  updateBooth,
  deleteBooth,
} from '@controllers/cms';

/**
 * Editing profile
 * @route GET /booths
 * @group Booth - Booth operation
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
router.get('/', listBooths);
router.get('/:id', detailBooth);
router.post('/', createBooth);
router.put('/:id', updateBooth);
router.delete('/:id', deleteBooth);

export { router };
