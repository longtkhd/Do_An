import * as resourceHubsService from '@services/resourceHubs';
import { COMMON_CODE } from '@constants/codes';
import { hasPermissions } from '@helpers/jwt';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { removeFolder } from '@helpers/file';

export default [
  ...hasPermissions(['deleteResourceHub']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const resourceHubDel = await resourceHubsService.findOneResourceHubByField(
        {
          id,
        }
      );
      if (!resourceHubDel) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      removeFolder(`resourceHubs/${resourceHubDel.id}`);
      await resourceHubsService.deleteResourceHub(resourceHubDel);
      return buildSuccessResponse(
        res,
        successData({ id: resourceHubDel.code }),
        200
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
