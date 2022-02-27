import { VALIDATOR } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
import { verifyJwtToken, signJwt } from '@helpers/jwt';
import { systemConfig } from '@configs';
import * as tokensService from '@services/tokens';
import { COMMON_CODE } from '@constants/codes';

import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';

const validator = [
  checkSchema({
    refreshToken: {
      notEmpty: {
        errorMessage: VALIDATOR.REFRESH_TOKEN_NULL,
      },
    },
  }),
  body('refreshToken').trim(),
  sanitizeBody('refreshToken').escape(),
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
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.VALIDATION_ERROR, errMess)
        );
      }
      const { refreshToken } = req.body;
      const {
        refreshTokenSecret,
        accessTokenSecret,
        accessTokenExpiredTime,
      } = systemConfig;
      try {
        const refreshTokenDecoded = await verifyJwtToken(
          refreshToken,
          refreshTokenSecret
        );
        const { userId } = refreshTokenDecoded;
        const userToken = await tokensService.findTokenByUser(userId);
        if (!userToken) {
          return buildErrorResponse(
            res,
            errorData(COMMON_CODE.REFESH_TOKEN_NOT_FOUND, err && err.message),
            403
          );
        }
        const jwtPayload = {
          userId,
        };
        const accessToken = signJwt(
          jwtPayload,
          accessTokenSecret,
          accessTokenExpiredTime
        );
        await tokensService.saveUserToken(userId, accessToken);
        const dataSuccess = successData({
          accessToken,
          accessTokenExpiredTime,
        });
        return buildSuccessResponse(res, dataSuccess);
      } catch (err) {
        await tokensService.detroyTokenByToken(refreshToken);
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.EXPIRED_REFESH_TOKEN, err && err.message),
          403
        );
      }
    } catch (err) {
      return buildErrorResponse(
        res,
        errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message)
      );
    }
  },
];
