import * as rolesService from '@services/roles';
import * as rolePermissionsService from '@services/rolePermissions';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';

export default [
  ...hasPermissions(['getPermissionsByRole']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const role = await rolesService.findOneRoleByField({ id });
      if (!role) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      const rolePermissions = await rolePermissionsService.getPermissionFullInfoByRoleId(
        role.id
      );
      const permissions = rolePermissions.map((item) => item.permission);
      return buildSuccessResponse(res, successData({ permissions }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
