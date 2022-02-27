import { VALIDATOR, REGEX_PASSWORD } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
import * as usersService from '@services/users';
import * as boothsService from '@services/booths';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { systemConfig } from '@configs';
import { hasPermissions } from '@helpers/jwt';
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
    status: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Status'),
      },
      isBoolean: {
        errorMessage: VALIDATOR.MUST_BE_BOOLEAN_TYPE('Status'),
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
  sanitizeBody('status').customSanitizer((value) => {
    return !!value ? 'ACTIVE' : 'INACTIVE';
  }),
];

export default [
  ...hasPermissions(['createUser', 'createOrganizerUser']),
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
        password,
        firstName,
        lastName,
        roleId,
        status,
        phone,
        organizerId,
      } = req.body;
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
      let boothId = null;
      // If booth owner => Create booth
      if (roleId === systemConfig.roles.BOOTH_OWNER) {
        const { boothName, sceneTemplateId } = req.body;
        const booth = await boothsService.createBooth({
          name: boothName,
          sceneTemplateId,
          type: systemConfig.boothTypes.STANDARD,
        });
        boothId = booth.id;
      }
      // End create booth
      const newUser = await usersService.createUser({
        userName,
        email,
        password,
        firstName,
        lastName,
        roleId,
        status,
        phone,
        organizerId,
        boothId,
      });
      ejs.renderFile(path.resolve(path.join('app', 'templates') + '/create_new_user.ejs'), {
        firstName,
        email,
        password,
      }).then(result => {
        sendMail(
          email,
          'Access to the event',
          result
        )
      })
      return buildSuccessResponse(res, successData({ id: newUser.id }), 201);
    } catch (err) {
      console.log(err);
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
