import { sanitizeParam } from 'express-validator';
import * as usersService from '@services/users';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';

export default [
  ...hasPermissions(['deleteUser']),
  [sanitizeParam('id').toInt()],
  async (req, res) => {
    try {
      const { user } = req;
      const { id } = req.params;
      const userDel = await usersService.findOneUserByField({ id });
      if (user.id === id) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.DONT_ACCEPT_DELETE_SELF),
          401
        );
      }
      if (!userDel) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      await usersService.deleteUser(userDel);
      return buildSuccessResponse(res, successData({ id: userDel.id }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
