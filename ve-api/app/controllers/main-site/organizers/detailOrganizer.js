import * as organizersService from '../../../services/organizers';
import { COMMON_CODE } from '../../../constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '../../../helpers/response';

export default [
  async (req, res) => {
    console.log('here')
    try {
      const organizer = await organizersService.findOneOrganizerByField();
      if (!organizer) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      return buildSuccessResponse(res, successData({ organizer }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
