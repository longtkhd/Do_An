import { checkSchema, validationResult } from 'express-validator';
import { difference } from 'lodash';
import * as rolesService from '@services/roles';
import * as permissionsService from '@services/permissions';
import * as rolePermissionsService from '@services/rolePermissions';
import { VALIDATOR } from '@constants';
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
    permissionIds: {
      isArray: {
        errorMessage: VALIDATOR.MUST_BE_ARRAY('permissionIds'),
      },
    },
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
      const { permissionIds } = req.body;
      const role = await rolesService.findOneRoleByField({ id });
      if (!role) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }

      const pers = await Promise.all(
        permissionIds.map((item) =>
          permissionsService.findOnePermissionByField({ id: item })
        )
      );
      const resultValidOrNot = pers.map((item) => {
        if (item) {
          return item.id;
        }
        return null;
      });
      const diff = difference(permissionIds, resultValidOrNot);
      if (diff.length) {
        const err = `permissionIds ${diff.join(', ')} not exist`;
        const dataErr = errorData(COMMON_CODE.VALIDATION_ERROR, err);
        return buildErrorResponse(res, dataErr);
      }

      const allPermissions = await rolePermissionsService.getPermissionFullInfoByRoleId(
        id
      );
      const allPermissionIds = allPermissions.map((item) => item.permissionId);
      const deletePerIds = difference(allPermissionIds, permissionIds);
      const createPerIds = difference(permissionIds, allPermissionIds);
      await rolePermissionsService.deleteMultiRolePermissions({
        roleId: id,
        permissionId: { $in: deletePerIds },
      });
      const newObj = createPerIds.map((item) => ({
        permissionId: item,
        roleId: id,
      }));
      const results = await rolePermissionsService.createMultiRolePermissions(
        newObj
      );
      const newPermissions = results.map((item) => item.permissionId);
      return buildSuccessResponse(res, successData({ newPermissions }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
