import * as assetsService from '@services/assets';
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
  ...hasPermissions(['deleteAsset']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const assetDel = await assetsService.findOneAssetByField({
        id,
      });
      if (!assetDel) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      removeFolder(`assets/${assetDel.id}`);
      await assetsService.deleteAsset(assetDel);
      return buildSuccessResponse(res, successData({ id: assetDel.code }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
