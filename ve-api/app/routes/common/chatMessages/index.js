'use strict';
import { Router } from 'express';
const router = Router();

import { uploadMessageFiles } from '@controllers/common';

router.post('/upload', uploadMessageFiles);

export { router };
