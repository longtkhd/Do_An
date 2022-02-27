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
  ...hasPermissions(['getUserSummary']),
  async (req, res) => {
    try {
      const totalUser = await usersService.countUserByField({
        roleId: null,
      });
      const totalRegister = await usersService.countUserByField({
        selfRegister: true,
      });
      return buildSuccessResponse(
        res,
        successData({
          totalUser,
          totalRegister,
          totalCreated: totalUser - totalRegister,
        }),
        200
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
