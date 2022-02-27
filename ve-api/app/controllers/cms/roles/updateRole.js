import { VALIDATOR } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
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
    },
  }),
  body('name').trim(),
  sanitizeBody('name').escape(),
  sanitizeBody('status').customSanitizer((value) => {
    return !!value ? 'ACTIVE' : 'INACTIVE';
  }),
];

export default [
  ...hasPermissions(['updateRole']),
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
      const role = await rolesService.findOneRoleByField({ id });
      if (!role) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      const { name, status } = req.body;
      const roleWithNameExist = await rolesService.findOneRoleByField({
        name,
        id: {
          $ne: role.id,
        },
      });
      if (roleWithNameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.NAME_ALREADY_IN_USE)
        );
      }
      await rolesService.updateRole(role, {
        name,
        status,
      });
      return buildSuccessResponse(res, successData({ id: role.id }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
