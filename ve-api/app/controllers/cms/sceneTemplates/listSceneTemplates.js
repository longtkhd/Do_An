import getParam from '@helpers/params';
import * as sceneTemplatesService from '@services/sceneTemplates';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';

export default [
  ...hasPermissions(['listSceneTemplates']),
  async (req, res) => {
    try {
      const sceneType = getParam(req.query, 'sceneType');
      const sceneTemplates = await sceneTemplatesService.findAllSceneTemplatesByField(
        { sceneType }
      );
      return buildSuccessResponse(res, successData({ sceneTemplates }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
