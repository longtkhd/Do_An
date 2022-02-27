'use strict';
import { Router } from 'express';
const router = Router();

import { detailOrganizer } from '../../../controllers/main-site';

router.get('/', detailOrganizer);

export { router };
