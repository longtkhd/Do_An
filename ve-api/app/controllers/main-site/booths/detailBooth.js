import * as boothsService from '@services/booths';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
  buildAssetsResponse,
} from '@helpers/response';
import { loadUserToRequest } from '@helpers/jwt';

export default [
  loadUserToRequest(),
  async (req, res) => {
    try {
      const { id } = req.params;
      const booth = await boothsService.findOneBoothByField({ id });
      if (!booth) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      return buildSuccessResponse(
        res,
        successData({ booth: buildAssetsResponse(booth) }),
        200
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
