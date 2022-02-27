import { VALIDATOR } from '@constants';
import { query } from 'express-validator';
import getParam from '@helpers/params';
import { TYPE_QUERY } from '@constants';
import * as collectorsService from '@services/collectors';
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
  ...hasPermissions(['listCollectors']),
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
          columnId: 'hallId',
          value: getParam(req.query, 'hallId'),
        },
        {
          columnId: 'boothId',
          value:
            getParam(req.query, 'boothId') || getParam(req.query, 'infoDeskId'),
        },
        {
          columnId: 'stageId',
          value: getParam(req.query, 'stageId'),
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
      const {
        count: total,
        rows: collectors,
      } = await collectorsService.listCollectors(
        paginationOptions,
        sortOptions,
        filterOptions
      );
      const dataSuccess = successData(
        paginationData(collectors, { ...paginationOptions, total })
      );
      return buildSuccessResponse(res, dataSuccess);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
