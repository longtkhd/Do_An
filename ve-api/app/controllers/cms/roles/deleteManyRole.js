import { VALIDATOR } from '@constants';
import { validationResult, checkSchema } from 'express-validator';
import * as rolesService from '@services/roles';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';

const validator = [
  checkSchema({
    roleIds: {
      notEmpty: {
        errorMessage: VALIDATOR.ROLE_IDS_NULL,
      },
    },
  }),
];
export default [
  validator,
  ...hasPermissions(['deleteManyRole']),
  async (req, res) => {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        const errMess = errors
          .array()
          .map((e) => e.msg)
          .join(', ');
        const dataErr = errorData(COMMON_CODE.VALIDATION_ERROR, errMess);
        return buildErrorResponse(res, dataErr);
      }
      const { user } = req;
      const { roleIds } = req.body;
      if (roleIds.includes(user.role.id)) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.DONT_ACCEPT_DELETE_ROLE_SELF),
          401
        );
      }
      const roleDels = await rolesService.findAllRoleByField({ id: roleIds });
      if (!roleDels || roleDels.length === 0) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      for (let i = 0; i < roleDels.length; i++) {
        if (roleDels[i].roleAcp) {
          const dataErr = errorData(COMMON_CODE.ACCESS_DENY);
          return buildErrorResponse(res, dataErr, 401);
        }
      }
      await rolesService.deleteManyRole({ id: roleIds });
      return buildSuccessResponse(
        res,
        successData({ id: roleIds.join(', ') }),
        200
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
