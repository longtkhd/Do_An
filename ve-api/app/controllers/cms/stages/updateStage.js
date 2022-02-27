import { VALIDATOR } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
import * as stagesService from '@services/stages';
import * as sceneAssetsService from '@services/sceneAssets';
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
    name: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Name'),
      },
    },
  }),
  body('name').trim(),
  sanitizeBody('status').customSanitizer((value) => {
    return !!value ? 'ACTIVE' : 'INACTIVE';
  }),
];

export default [
  ...hasPermissions(['updateStage']),
  validator,
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
      const { id } = req.params;
      const stage = await stagesService.findOneStageByField({ id });
      if (!stage) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      const {
        name,
        status,
        assets,
        centreScreenUrl,
        bannerLeftUrl,
        bannerRightUrl,
        zoomMeeting,
        type,
        youtubeUrl,
      } = req.body;
      const stageWithNameExist = await stagesService.findOneStageByField({
        name,
        id: {
          $ne: stage.id,
        },
      });
      if (stageWithNameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.NAME_ALREADY_IN_USE)
        );
      }
      await stagesService.updateStage(stage, {
        name,
        status,
        centreScreenUrl,
        bannerLeftUrl,
        bannerRightUrl,
        zoomMeeting,
        type,
        youtubeUrl,
      });
      if (assets) {
        const newAssets = [];
        const deleteAssets = [];
        assets.map((asset) => {
          newAssets.push({
            ...asset,
            stageId: stage.id,
          });
          if (asset.oldAssetId) {
            deleteAssets.push({
              stageId: stage.id,
              assetId: asset.oldAssetId,
              key: asset.key,
            });
          }
        });
        await Promise.all(
          deleteAssets.map((deleteAsset) =>
            sceneAssetsService.deleteManySceneAsset(deleteAsset)
          )
        );
        await sceneAssetsService.bulkCreateSceneAsset(newAssets);
      }
      return buildSuccessResponse(res, successData({ id: stage.id }), 200);
    } catch (err) {
      console.log(err);
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
