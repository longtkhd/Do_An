import { VALIDATOR } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
import { signJwt } from '@helpers/jwt';
import { systemConfig } from '@configs';
import * as usersService from '@services/users';
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
    usernameOrEmail: {
      notEmpty: {
        errorMessage: VALIDATOR.USER_NAME_NULL,
      },
    },
    password: {
      notEmpty: {
        errorMessage: VALIDATOR.PASSWORD_NULL,
      },
    },
  }),
  body('usernameOrEmail').trim(),
  body('password').trim(),
  sanitizeBody('usernameOrEmai').escape(),
  sanitizeBody('password').escape(),
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
      const { usernameOrEmail, password } = req.body;
      const user = await usersService.compareUserLogin(usernameOrEmail);
      if (!user || !user.validPassword(password)) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.LOGIN_INFO_INVALID)
        );
      }
      const { id: userId } = user;
      const jwtPayload = {
        userId,
      };
      const {
        accessTokenSecret,
        refreshTokenSecret,
        accessTokenExpiredTime,
        refreshTokenExpiredTime,
      } = systemConfig;
      const accessToken = signJwt(
        jwtPayload,
        accessTokenSecret,
        accessTokenExpiredTime
      );
      const refreshToken = signJwt(
        jwtPayload,
        refreshTokenSecret,
        refreshTokenExpiredTime
      );
      await tokensService.saveUserToken(user.id, accessToken);
      const dataSuccess = successData({
        accessToken,
        refreshToken,
        refreshTokenExpiredTime,
      });
      return buildSuccessResponse(res, dataSuccess);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
