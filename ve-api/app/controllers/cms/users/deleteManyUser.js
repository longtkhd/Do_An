import { VALIDATOR } from '@constants';
import { validationResult, checkSchema } from 'express-validator';
import * as usersService from '@services/users';
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
    userIds: {
      notEmpty: {
        errorMessage: VALIDATOR.USER_IDS_NULL,
      },
    },
  }),
];
export default [
  validator,
  ...hasPermissions(['deleteManyUser']),
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
      const { userIds } = req.body;
      if (userIds.includes(user.id)) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.DONT_ACCEPT_DELETE_SELF),
          401
        );
      }
      const userDels = await usersService.findAllUserByField({ id: userIds });
      if (!userDels || userDels.length === 0) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      await usersService.deleteManyUser({ id: userIds });
      return buildSuccessResponse(
        res,
        successData({ id: userIds.join(', ') }),
        200
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
