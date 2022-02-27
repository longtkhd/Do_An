'use strict';
import { Router } from 'express';
const router = Router();

import { detailLobby, updateLobby } from '@controllers/cms';

/**
 * Editing profile
 * @route GET /lobbies
 * @group Lobby - Lobby operation
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
router.get('/:id', detailLobby);
router.put('/:id', updateLobby);

export { router };
