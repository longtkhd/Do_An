import { VALIDATOR } from '@constants';
import { validationResult, checkSchema, sanitizeBody } from 'express-validator';
import * as boothsService from '@services/booths';
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
  ...hasPermissions(['createBooth']),
  uploadFile('avatar', 'booths/willReplace'),
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
        websiteUrl,
        meetingUrl,
        aboutUs,
        assets: strAssets,
        attributes: strAttributes,
      } = req.body;
      const boothWithNameExist = await boothsService.findOneBoothByField({
        name,
      });
      if (boothWithNameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.NAME_ALREADY_IN_USE)
        );
      }
      const attributes = strAttributes && JSON.parse(strAttributes);
      const newBooth = await boothsService.createBooth({
        name,
        status,
        sceneTemplateId,
        attributes,
        websiteUrl,
        meetingUrl,
        aboutUs,
        avatar: keyS3.split('/').pop(),
      });
      if (strAssets) {
        const assets = JSON.parse(strAssets);
        const newAssets = assets.map((asset) => ({
          ...asset,
          boothId: newBooth.id,
        }));
        await sceneAssetsService.bulkCreateSceneAsset(newAssets);
      }
      await renameFolder('booths/willReplace', `booths/${newBooth.id}`);
      return buildSuccessResponse(res, successData({ id: newBooth.id }), 201);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
