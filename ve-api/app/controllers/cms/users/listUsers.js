import { VALIDATOR } from '@constants';
import { query } from 'express-validator';
import * as usersService from '@services/users';
import getParam from '@helpers/params';
import { TYPE_QUERY } from '@constants';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
  paginationData,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';

const validator = [
  query('pageSize')
    .exists()
    .withMessage(VALIDATOR.PAGE_NULL)
    .isInt({ min: 1 })
    .withMessage(VALIDATOR.PAGE_GREATER_ONE),
  query('page')
    .exists()
    .withMessage(VALIDATOR.PAGE_NULL)
    .isInt({ min: 1 })
    .withMessage(VALIDATOR.PAGE_GREATER_ONE),
];
export default [
  ...hasPermissions([
    'listAllUsers',
    'listOrganizerUsers',
    'listBoothOwnerUsers',
  ]),
  validator,
  async (req, res) => {
    try {
      const sortOptions = [
        {
          sort: getParam(req.query, 'sort', 'createdAt'),
          order: getParam(req.query, 'order', 'descend'),
        },
      ];

      const filterOptions = [
        {
          columnId: 'firstName',
          type: TYPE_QUERY.LIKE,
          value: getParam(req.query, 'firstName'),
        },
        {
          columnId: 'lastName',
          type: TYPE_QUERY.LIKE,
          value: getParam(req.query, 'lastName'),
        },
        {
          columnId: 'userName',
          type: TYPE_QUERY.LIKE,
          value: getParam(req.query, 'userName'),
        },
        {
          columnId: 'email',
          type: TYPE_QUERY.LIKE,
          value: getParam(req.query, 'email'),
        },
        {
          columnId: 'roleId',
          type: TYPE_QUERY.IN,
          value: getParam(req.query, 'roleId'),
        },
        {
          columnId: 'status',
          type: TYPE_QUERY.IN,
          value: getParam(req.query, 'status'),
        },
      ];
      const paginationOptions = {
        pageSize: parseInt(getParam(req.query, 'pageSize', '20')),
        page: parseInt(getParam(req.query, 'page', '1')),
      };
      const { count: total, rows: users } = await usersService.listUsers(
        paginationOptions,
        sortOptions,
        filterOptions
      );
      const dataSuccess = successData(
        paginationData(users, { ...paginationOptions, total })
      );
      return buildSuccessResponse(res, dataSuccess);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
