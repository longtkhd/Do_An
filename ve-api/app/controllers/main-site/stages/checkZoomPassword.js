import * as stagesService from '@services/stages';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { loadUserToRequest } from '@helpers/jwt';

export default [
  loadUserToRequest(),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const stage = await stagesService.findOneStageByField({ id });
      if (!stage) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      let correct = false;
      if (password == stage.zoomMeeting.meetingPassword) {
        correct = true;
      }
      return buildSuccessResponse(res, successData({ correct }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
