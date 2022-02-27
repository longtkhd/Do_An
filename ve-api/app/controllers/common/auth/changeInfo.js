import { VALIDATOR, REGEX_PASSWORD } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
import * as usersService from '@services/users';
import * as rolesService from '@services/roles';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { isAuthenticated } from '@helpers/jwt';

const validator = [
  checkSchema({
    userName: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Username'),
      },
      isAlphanumeric: {
        errorMessage: VALIDATOR.MUST_CONTAIN_ALPHA_NUMERIC,
      },
      isLength: {
        errorMessage: VALIDATOR.MIN_MAX_LENGTH(6, 255),
        options: {
          min: 6,
          max: 255,
        },
      },
    },
    email: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Email'),
      },
      isEmail: {
        errorMessage: VALIDATOR.EMAIL_INVALID,
      },
    },
    firstName: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('First name'),
      },
    },
    lastName: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Last name'),
      },
    },
  }),
  body('userName').trim(),
  body('email').trim(),
  body('firstName').trim(),
  body('lastName').trim(),
  sanitizeBody('userName').escape(),
  sanitizeBody('email').escape(),
  sanitizeBody('firstName').escape(),
  sanitizeBody('lastName').escape(),
];

export default [
  isAuthenticated,
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
      const {
        userName,
        email,
        firstName,
        lastName,
        phone = null,
        oldPassword,
        newPassword,
      } = req.body;
      const { user } = req;
      const { id } = user;

      const userWithEmailExist = await usersService.findOneUserByField({
        email,
        id: {
          $ne: id,
        },
      });
      if (userWithEmailExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.EMAIL_ALREADY_IN_USE)
        );
      }
      const userWithUsernameExist = await usersService.findOneUserByField({
        userName,
        id: {
          $ne: id,
        },
      });
      if (userWithUsernameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.USER_NAME_ALREADY_IN_USE)
        );
      }

      const userUpdate = await usersService.compareUserLogin(user.email);

      const newData = {
        userName,
        email,
        firstName,
        lastName,
        phone,
      };
      if (oldPassword && newPassword) {
        if (!userUpdate.validPassword(oldPassword)) {
          return buildErrorResponse(res, errorData(COMMON_CODE.PASSWORD_WRONG));
        }
        newData.password = newPassword;
      }

      await usersService.updateUser(userUpdate, newData);

      return buildSuccessResponse(res, successData({ id: userUpdate.id }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
