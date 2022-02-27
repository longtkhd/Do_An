import * as stagesService from '@services/stages';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';

export default [
  ...hasPermissions(['getAllStages']),
  async (req, res) => {
    try {
      const stages = await stagesService.findAllStageByField();
      return buildSuccessResponse(res, successData({ stages }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
