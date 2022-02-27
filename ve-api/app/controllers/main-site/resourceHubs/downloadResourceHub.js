import * as resourceHubsService from '@services/resourceHubs';
import { COMMON_CODE } from '@constants/codes';
import { errorData, buildErrorResponse } from '@helpers/response';
import { loadUserToRequest } from '@helpers/jwt';
import { downloadFile } from '@helpers/file';

export default [
  loadUserToRequest(),
  async (req, res) => {
    try {
      const { id } = req.params;
      const resourceHub = await resourceHubsService.findOneResourceHubByField({
        id,
      });
      if (!resourceHub) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      const { asset } = resourceHub;
      if (asset.value && asset.type === 'MEDIA') {
        const filePath = `assets/${asset.id}/${asset.value}`;
        try {
          const fileStream = await downloadFile(filePath);
          res.attachment(filePath);
          return fileStream.pipe(res);
        } catch (error) {
          const dataErr = errorData(COMMON_CODE.ASSET_NOT_EXIST);
          return buildErrorResponse(res, dataErr, 404);
        }
      }
      const dataErr = errorData(COMMON_CODE.ASSET_NOT_EXIST);
      return buildErrorResponse(res, dataErr);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
