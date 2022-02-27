import { VALIDATOR } from '@constants';
import { validationResult, checkSchema, sanitizeBody } from 'express-validator';
import * as permissionsService from '@services/permissions';
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
    code: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Code'),
      },
    },
  }),
  sanitizeBody('status').customSanitizer((value) => {
    return value ? 'ACTIVE' : 'INACTIVE';
  }),
];

export default [
  ...hasPermissions(['createPermission']),
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
      const { name, status, code } = req.body;
      const permissionWithCodeExist = await permissionsService.findOnePermissionByField(
        {
          code,
        }
      );
      if (permissionWithCodeExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.CODE_ALREADY_IN_USE)
        );
      }
      const newPermission = await permissionsService.createPermission({
        name,
        status,
        code,
      });
      return buildSuccessResponse(
        res,
        successData({ id: newPermission.code }),
        201
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
