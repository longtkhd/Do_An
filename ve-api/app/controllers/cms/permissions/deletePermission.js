import * as permissionsService from '@services/permissions';
import { COMMON_CODE } from '@constants/codes';
import { hasPermissions } from '@helpers/jwt';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';

export default [
  ...hasPermissions(['deletePermission']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const permissionDel = await permissionsService.findOnePermissionByField({
        id,
      });
      if (!permissionDel) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      await permissionsService.deletePermission(permissionDel);
      return buildSuccessResponse(
        res,
        successData({ id: permissionDel.code }),
        200
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
