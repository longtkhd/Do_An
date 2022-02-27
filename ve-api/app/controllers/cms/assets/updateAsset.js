import { VALIDATOR } from '@constants';
import { validationResult, checkSchema, sanitizeBody } from 'express-validator';
import * as assetsService from '@services/assets';
import { COMMON_CODE } from '@constants/codes';
import { hasPermissions } from '@helpers/jwt';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { uploadFile, removeFile } from '@helpers/file';

const validator = [
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Name'),
      },
    },
    status: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Status'),
      },
      isBoolean: {
        errorMessage: VALIDATOR.MUST_BE_BOOLEAN_TYPE('Status'),
      },
    },
  }),
  sanitizeBody('status').customSanitizer((value) => {
    return value ? 'ACTIVE' : 'INACTIVE';
  }),
];

export default [
  ...hasPermissions(['updateAsset']),
  async (req, res, next) => {
    const { id } = req.params;
    const asset = await assetsService.findOneAssetByField({ id });
    if (!asset) {
      const dataErr = errorData(COMMON_CODE.NOT_FOUND);
      return buildErrorResponse(res, dataErr, 404);
    }
    req.asset = asset;
    return uploadFile(
      'file',
      `assets/${asset.id}`,
      50,
      'jpeg|jpg|png|gif|mp4|webm|mpv|m4v|m4p'
    )(req, res, next);
  },
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
      const { asset } = req;
      const { key: keyS3 } = req.file || {};
      const { name, status, boothId, type } = req.body;
      const assetWithNameExist = await assetsService.findOneAssetByField({
        name,
        boothId,
        id: {
          $ne: asset.id,
        },
      });
      if (assetWithNameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.NAME_ALREADY_IN_USE)
        );
      }
      let { value } = req.body;
      if (req.file) {
        await removeFile(`assets/${asset.id}/${asset.value}`);
        value = req.file.key.split('/').pop();
      }
      await assetsService.updateAsset(asset, {
        name,
        status,
        ...(value && {
          value: type === 'MEDIA' ? keyS3.split('/').pop() : value,
        }),
      });
      return buildSuccessResponse(res, successData({ id: asset.id }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
