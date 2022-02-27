import * as landingsService from '@services/landings';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';

export default [
  async (req, res) => {
    try {
      const { id } = req.params;
      const landing = await landingsService.findOneLandingByField({ id });
      if (!landing) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      return buildSuccessResponse(res, successData({ landing }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
