import * as rolesService from '@services/roles';
import { COMMON_CODE } from '@constants/codes';
import { sanitizeParam } from 'express-validator';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';

export default [
  ...hasPermissions(['deleteRole']),
  [sanitizeParam('id').toInt()],
  async (req, res) => {
    try {
      const { user } = req;
      const { id } = req.params;
      const roleDel = await rolesService.findOneRoleByField({ id });
      if (user.role.id === id) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.DONT_ACCEPT_DELETE_ROLE_SELF),
          401
        );
      }
      if (!roleDel) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      if (roleDel.roleAcp) {
        const dataErr = errorData(COMMON_CODE.ACCESS_DENY);
        return buildErrorResponse(res, dataErr, 401);
      }
      await rolesService.deleteRole(roleDel);
      return buildSuccessResponse(res, successData({ id: roleDel.id }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
