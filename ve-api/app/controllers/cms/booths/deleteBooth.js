import * as boothsService from '@services/booths';
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
  ...hasPermissions(['deleteBooth']),
  [sanitizeParam('id').toInt()],
  async (req, res) => {
    try {
      const { id } = req.params;
      const boothDel = await boothsService.findOneBoothByField({ id });
      if (!boothDel) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      removeFolder(`booths/${boothDel.id}`);
      await boothsService.deleteBooth(boothDel);
      return buildSuccessResponse(res, successData({ id: boothDel.id }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
