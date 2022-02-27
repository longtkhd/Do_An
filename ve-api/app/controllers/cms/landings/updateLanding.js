import { VALIDATOR } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
import * as landingsService from '@services/landings';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';
import { uploadFile, removeFile } from '@helpers/file';

const validator = [
  checkSchema({
    title: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Title'),
      },
    },
  }),
  body('title').trim(),
  sanitizeBody('status').customSanitizer((value) => {
    return !!value ? 'ACTIVE' : 'INACTIVE';
  }),
];

export default [
  ...hasPermissions(['updateLanding']),
  async (req, res, next) => {
    const { id } = req.params;
    const landing = await landingsService.findOneLandingByField({ id });
    if (!landing) {
      const dataErr = errorData(COMMON_CODE.NOT_FOUND);
      return buildErrorResponse(res, dataErr, 404);
    }
    req.landing = landing;
    return uploadFile('background', `landings/${landing.id}`)(req, res, next);
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
      const { landing } = req;
      const {
        title,
        status,
        button,
        isAllowLogin,
        description,
        disableLoginMessage,
      } = req.body;
      const landingWithTitleExist = await landingsService.findOneLandingByField(
        {
          title,
          id: {
            $ne: landing.id,
          },
        }
      );
      if (landingWithTitleExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.NAME_ALREADY_IN_USE)
        );
      }
      // Create logo favicon
      let background = null;
      if (req.file) {
        await removeFile(`landings/${landing.id}/${landing.background}`);
        background = req.file.key.split('/').pop();
      }
      await landingsService.updateLanding(landing, {
        title,
        status,
        button,
        isAllowLogin,
        disableLoginMessage,
        description,
        ...(background && { background }),
      });
      return buildSuccessResponse(res, successData({ id: landing.id }), 200);
    } catch (err) {
      console.log(err);
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
