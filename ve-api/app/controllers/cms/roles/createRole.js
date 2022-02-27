import { VALIDATOR } from '@constants';
import { validationResult, checkSchema, sanitizeBody } from 'express-validator';
import * as rolesService from '@services/roles';
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
    status: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Status'),
      },
      isBoolean: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Status'),
      },
    },
  }),
  sanitizeBody('status').customSanitizer((value) => {
    return !!value ? 'ACTIVE' : 'INACTIVE';
  }),
];

export default [
  ...hasPermissions(['createRole']),
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
      const { name, status } = req.body;
      const roleWithNameExist = await rolesService.findOneRoleByField({
        name,
      });
      if (roleWithNameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.NAME_ALREADY_IN_USE)
        );
      }
      const newRole = await rolesService.createRole({
        name,
        status,
      });
      return buildSuccessResponse(res, successData({ id: newRole.id }), 201);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
