import * as resourceHubsService from '@services/resourceHubs';
import { COMMON_CODE } from '@constants/codes';
import { hasPermissions } from '@helpers/jwt';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';

export default [
  ...hasPermissions(['detailResourceHub']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const resourceHub = await resourceHubsService.findOneResourceHubByField({
        id,
      });
      if (!resourceHub) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      return buildSuccessResponse(res, successData({ resourceHub }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
