import * as hallsService from '@services/halls';
import { COMMON_CODE } from '@constants/codes';
import { sanitizeParam } from 'express-validator';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';
import { removeFolder } from '@helpers/file';

export default [
  ...hasPermissions(['deleteHall']),
  [sanitizeParam('id').toInt()],
  async (req, res) => {
    try {
      const { id } = req.params;
      const hallDel = await hallsService.findOneHallByField({ id });
      if (!hallDel) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      removeFolder(`halls/${hallDel.id}`);
      await hallsService.deleteHall(hallDel);
      return buildSuccessResponse(res, successData({ id: hallDel.id }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
