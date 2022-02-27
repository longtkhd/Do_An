import express from 'express';
const router = express.Router();

import { router as organizerRouter } from './organizers';
import { router as landingRouter } from './landings';
import { router as lobbyRouter } from './lobbies';
import { router as boothRouter } from './booths';
import { router as hallRouter } from './halls';
import { router as resourceHubRouter } from './resourceHubs';
import { router as stageRouter } from './stages';

router.use('/organizers', organizerRouter);
router.use('/landings', landingRouter);
router.use('/lobbies', lobbyRouter);
router.use('/booths', boothRouter);
router.use('/halls', hallRouter);
router.use('/resource-hubs', resourceHubRouter);
router.use('/stages', stageRouter);

export default router;
