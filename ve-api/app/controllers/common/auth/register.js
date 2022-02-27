import { VALIDATOR, REGEX_PASSWORD } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
import * as usersService from '@services/users';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { sendMail } from "@helpers/mail";
import ejs from 'ejs';
import path from 'path';

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
    password: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Password'),
      },
      matches: {
        options: REGEX_PASSWORD,
        errorMessage: VALIDATOR.PASSWORD_INVALID,
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
  body('password').trim(),
  body('firstName').trim(),
  body('lastName').trim(),
  sanitizeBody('userName').escape(),
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
  sanitizeBody('firstName').escape(),
  sanitizeBody('lastName').escape(),
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
      const { userName, email, password, firstName, lastName, selfRegister } = req.body;

      const userWithEmailExist = await usersService.findOneUserByField({
        email,
      });
      if (userWithEmailExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.EMAIL_ALREADY_IN_USE)
        );
      }
      const userWithUsernameExist = await usersService.findOneUserByField({
        userName,
      });
      if (userWithUsernameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.USER_NAME_ALREADY_IN_USE)
        );
      }

      const newUser = await usersService.createUser({
        userName,
        email,
        password,
        firstName,
        lastName,
        selfRegister,
      });
      ejs.renderFile(path.resolve(path.join('app', 'templates') + '/registration_confirmation.ejs'), {
        firstName,
      }).then(result => {
        sendMail(
          email,
          'Thank you for registering',
          result
        )
      })
      return buildSuccessResponse(res, successData({ id: newUser.id }), 201);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
