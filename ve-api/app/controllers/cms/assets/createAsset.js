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
import { uploadFile, renameFolder } from '@helpers/file';

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
  ...hasPermissions(['createAsset']),
  uploadFile(
    'file',
    'assets/willReplace',
    50,
    'jpeg|jpg|png|gif|mp4|webm|mpv|m4v|m4p'
  ),
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
      const { key: keyS3 } = req.file || {};
      const { name, status, boothId, value, type } = req.body;
      const assetWithNameExist = await assetsService.findOneAssetByField({
        name,
        boothId,
      });
      if (assetWithNameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.NAME_ALREADY_IN_USE)
        );
      }
      const newAsset = await assetsService.createAsset({
        name,
        status,
        boothId,
        type,
        value: type === 'MEDIA' ? keyS3.split('/').pop() : value,
      });
      await renameFolder('assets/willReplace', `assets/${newAsset.id}`);
      return buildSuccessResponse(
        res,
        successData({
          id: newAsset.id,
          asset: newAsset,
        }),
        201
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
