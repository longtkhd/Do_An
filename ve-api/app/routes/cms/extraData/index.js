'use strict';
import { Router } from 'express';
const router = Router();

import { getExtraData } from '@controllers/cms';

/**
 * Editing profile
 * @route GET /extra-data
 * @group Extra Data - Data operation
 * @param {string} type.query
 * @returns {object} 200 - Successful getting
 * @returns {Error}  default - Unexpected error
 */
router.get('/', getExtraData);

export { router };
