'use strict';
import { Router } from 'express';
const router = Router();

import { listSceneTemplates } from '@controllers/cms';

router.get('/', listSceneTemplates);

export { router };
