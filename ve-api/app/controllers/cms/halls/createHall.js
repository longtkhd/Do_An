import { VALIDATOR } from '@constants';
import { validationResult, checkSchema, sanitizeBody } from 'express-validator';
import * as hallsService from '@services/halls';
import * as sceneAssetsService from '@services/sceneAssets';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';
import { uploadFile, renameFolder } from '@helpers/file';

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
  ...hasPermissions(['createHall']),
  uploadFile('avatar', 'halls/willReplace'),
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
      const { key: keyS3 } = req.file;
      const {
        name,
        status,
        sceneTemplateId,
        assets: strAssets,
        attributes: strAttributes,
      } = req.body;
      const hallWithNameExist = await hallsService.findOneHallByField({
        name,
      });
      if (hallWithNameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.NAME_ALREADY_IN_USE)
        );
      }
      const attributes = strAttributes && JSON.parse(strAttributes);
      const newHall = await hallsService.createHall({
        name,
        status,
        sceneTemplateId,
        attributes,
        avatar: keyS3.split('/').pop(),
      });
      if (strAssets) {
        const assets = JSON.parse(strAssets);
        const newAssets = assets.map((asset) => ({
          ...asset,
          hallId: newHall.id,
        }));
        await sceneAssetsService.bulkCreateSceneAsset(newAssets);
      }
      await renameFolder('halls/willReplace', `halls/${newHall.id}`);
      return buildSuccessResponse(res, successData({ id: newHall.id }), 201);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
