'use strict';
import { Router } from 'express';
const router = Router();

import {
  listUsers,
  createUser,
  updateUser,
  detailUser,
  deleteUser,
  deleteManyUser,
  getUserSummary,
} from '@controllers/cms';

/**
 * Editing profile
 * @route GET /users
 * @group User - User operation
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
router.get('/', listUsers);
router.get('/summary', getUserSummary);
router.get('/:id', detailUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/delete-many', deleteManyUser);
router.delete('/:id', deleteUser);

export { router };
