import { VALIDATOR } from '@constants';
import { validationResult, checkSchema, sanitizeBody } from 'express-validator';
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
      isLength: {
        errorMessage: VALIDATOR.MIN_MAX_LENGTH(3, 255),
        options: {
          min: 3,
          max: 255,
        },
      },
    },
  }),
  sanitizeBody('status').customSanitizer((value) => {
    return !!value ? 'ACTIVE' : 'INACTIVE';
  }),
];

export default [
  ...hasPermissions(['createStage']),
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
      });
      if (stageWithNameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.NAME_ALREADY_IN_USE)
        );
      }
      const newStage = await stagesService.createStage({
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
        const newAssets = assets.map((asset) => ({
          ...asset,
          stageId: newStage.id,
        }));
        await sceneAssetsService.bulkCreateSceneAsset(newAssets);
      }
      return buildSuccessResponse(res, successData({ id: newStage.id }), 201);
    } catch (err) {
      console.log(err);
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
