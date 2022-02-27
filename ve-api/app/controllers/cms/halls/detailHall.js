import * as hallsService from '@services/halls';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
  buildAssetsResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';

export default [
  ...hasPermissions(['detailHall']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const hall = await hallsService.findOneHallByField({ id });
      if (!hall) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      return buildSuccessResponse(
        res,
        successData({ hall: buildAssetsResponse(hall) }),
        200
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
