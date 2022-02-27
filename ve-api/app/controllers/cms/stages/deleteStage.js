import * as stagesService from '@services/stages';
import { COMMON_CODE } from '@constants/codes';
import { sanitizeParam } from 'express-validator';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';
import { removeFolder } from '@helpers/file';

export default [
  ...hasPermissions(['deleteStage']),
  [sanitizeParam('id').toInt()],
  async (req, res) => {
    try {
      const { id } = req.params;
      const stageDel = await stagesService.findOneStageByField({ id });
      if (!stageDel) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      removeFolder(`stages/${stageDel.id}`);
      await stagesService.deleteStage(stageDel);
      return buildSuccessResponse(res, successData({ id: stageDel.id }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
