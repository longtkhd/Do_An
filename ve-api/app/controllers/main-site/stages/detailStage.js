import * as stagesService from '@services/stages';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
  buildAssetsResponse,
} from '@helpers/response';
import { loadUserToRequest } from '@helpers/jwt';
import crypto from 'crypto';

export default [
  loadUserToRequest(),
  async (req, res) => {
    try {
      const { id } = req.params;
      const stage = await stagesService.findOneStageByField({ id });
      if (!stage) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }

      const {
        apiKey,
        apiSecret,
        meetingId,
        passwordRequired,
      } = stage.zoomMeeting;
      if (apiKey && apiSecret && meetingId) {
        const signature = generateSignature(apiKey, apiSecret, meetingId, 0);
        stage.zoomMeeting.signature = signature;
        if (passwordRequired) {
          delete stage.zoomMeeting.meetingPassword;
        }
        delete stage.zoomMeeting.apiSecret;
      } else {
        delete stage.zoomMeeting.apiKey;
        delete stage.zoomMeeting.apiSecret;
        delete stage.zoomMeeting.meetingId;
        delete stage.zoomMeeting.meetingPassword;
      }
      return buildSuccessResponse(
        res,
        successData({ stage: buildAssetsResponse(stage) }),
        200
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];

const generateSignature = (apiKey, apiSecret, meetingNumber, role) => {
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
    'base64'
  );
  const hash = crypto
    .createHmac('sha256', apiSecret)
    .update(msg)
    .digest('base64');
  const signature = Buffer.from(
    `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
  ).toString('base64');
  return signature;
};
