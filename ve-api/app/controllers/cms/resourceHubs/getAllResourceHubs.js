import * as resourceHubsService from '@services/resourceHubs';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';

export default [
  ...hasPermissions(['listResourceHubs']),
  async (req, res) => {
    try {
      const { boothId } = req.query;
      const resourceHubs = await resourceHubsService.findAllResourceHubByField({
        boothId,
      });
      return buildSuccessResponse(res, successData(resourceHubs), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
