'use strict';
import { Router } from 'express';
const router = Router();

import {
  listRoles,
  createRole,
  detailRole,
  updateRole,
  deleteRole,
  deleteManyRole,
  getPermissionsByRoleId,
  assignPermissions,
} from '@controllers/cms';

/**
 * Editing profile
 * @route GET /roles
 * @group Role - Role operation
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
router.get('/', listRoles);
router.get('/:id', detailRole);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/delete-many', deleteManyRole);
router.delete('/:id', deleteRole);
router.get('/:id/permissions', getPermissionsByRoleId);
router.post('/:id/permissions', assignPermissions);

export { router };
