import { VALIDATOR } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
import * as usersService from '@services/users';
import { COMMON_CODE } from '@constants/codes';
import { sendForgotPass } from '@helpers/mail';
import randomstring from 'randomstring';
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
  }),
  body('usernameOrEmail').trim(),
  sanitizeBody('usernameOrEmail').escape(),
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
      const { usernameOrEmail } = req.body;
      const user = await usersService.compareUserLogin(usernameOrEmail);
      if (!user) {
        const dataErr = errorData(COMMON_CODE.USER_NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      const newPassword = randomstring.generate(8);
      try {
        await sendForgotPass(
          user.firstName + ' ' + user.lastName,
          user.email,
          newPassword
        );
      } catch (error) {
        const dataErr = errorData(COMMON_CODE.SEND_MAIL_ERROR);
        return buildErrorResponse(res, dataErr, 404);
      }
      await usersService.updateUser(user, { password: newPassword });
      return buildSuccessResponse(res, successData({ id: user.id }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
