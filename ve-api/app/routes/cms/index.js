import express from 'express';
const router = express.Router();

import { router as userRouter } from './users';
import { router as roleRouter } from './roles';
import { router as extraDataRouter } from './extraData';
import { router as permissionRouter } from './permissions';
import { router as lobbyRouter } from './lobbies';
import { router as sceneTemplateRouter } from './sceneTemplates';
import { router as hallRouter } from './halls';
import { router as assetRouter } from './assets';
import { router as stageRouter } from './stages';
import { router as landingRouter } from './landings';
import { router as boothRouter } from './booths';
import { router as visitRouter } from './visits';
import { router as resourceHubRouter } from './resourceHubs';
import { router as collectorRouter } from './collectors';

import { successData, buildSuccessResponse } from '@helpers/response';

router.get('/ping', (req, res) => {
  const dataSuccess = successData();
  return buildSuccessResponse(res, dataSuccess);
});

router.use('/users', userRouter);
router.use('/roles', roleRouter);
router.use('/extra-data', extraDataRouter);
router.use('/permissions', permissionRouter);
router.use('/lobbies', lobbyRouter);
router.use('/scene-templates', sceneTemplateRouter);
router.use('/halls', hallRouter);
router.use('/assets', assetRouter);
router.use('/stages', stageRouter);
router.use('/landings', landingRouter);
router.use('/booths', boothRouter);
router.use('/visits', visitRouter);
router.use('/resource-hubs', resourceHubRouter);
router.use('/collectors', collectorRouter);

export default router;
