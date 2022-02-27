import { VALIDATOR } from '@constants';
import { validationResult, checkSchema, sanitizeBody } from 'express-validator';
import * as resourceHubsService from '@services/resourceHubs';
import { COMMON_CODE } from '@constants/codes';
import { hasPermissions } from '@helpers/jwt';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';

const validator = [
  checkSchema({
    resourceHubs: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('ResourceHubs'),
      },
      isArray: {
        errorMessage: VALIDATOR.MUST_BE_ARRAY_TYPE('ResourceHubs'),
      },
    },
  }),
];

export default [
  ...hasPermissions(['createResourceHub']),
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
      const { resourceHubs } = req.body;
      const newResourceHubs = await resourceHubsService.bulkCreateResourceHub(
        resourceHubs
      );
      return buildSuccessResponse(
        res,
        successData({
          resourceHubs: newResourceHubs,
        }),
        201
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
