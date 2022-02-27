import * as visitsService from '@services/visits';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';

export default [
  ...hasPermissions(['getVisitSummary']),
  async (req, res) => {
    try {
      const totalVisitMobile = await visitsService.countVisitByField({
        device: 'MOBILE',
      });
      const totalVisitBrowser = await visitsService.countVisitByField({
        device: 'BROWSER',
      });

      return buildSuccessResponse(
        res,
        successData({
          totalVisit: totalVisitMobile + totalVisitBrowser,
          totalVisitMobile,
          totalVisitBrowser,
        }),
        200
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
