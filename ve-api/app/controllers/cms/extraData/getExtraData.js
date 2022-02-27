import { validationResult, query } from 'express-validator';
import { VALIDATOR } from '@constants';
import { COMMON_CODE } from '@constants/codes';
import getParam from '@helpers/params';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import * as rolesService from '@services/roles';
import * as permissionsService from '@services/permissions';

const TYPE_EXTRA = ['roles', 'permissions'];

const validator = [
  query('type')
    .if((val) => val)
    .custom((val) => {
      const listExtra = val.split(',');
      if (!listExtra.every((item) => TYPE_EXTRA.includes(item))) {
        return Promise.reject(VALIDATOR.EXTRA_DATA_NOT_IN_AVAILABLE_SET);
      }
      return Promise.resolve();
    }),
];

export default [
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
      let listType = TYPE_EXTRA;
      const type = getParam(req.query, 'type');
      if (type) {
        listType = type.split(',');
      }
      const results = {};
      await Promise.all(
        listType.map(async (item) => {
          const val = await getSingleExtraData(item);
          results[item] = val;
          return item;
        })
      );
      return buildSuccessResponse(res, successData(results));
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];

const getSingleExtraData = (type) => {
  switch (type) {
    case 'roles':
      return rolesService.getAllRoles();
    case 'permissions':
      return permissionsService.getAllPermissions();
    default:
      return [];
  }
};
