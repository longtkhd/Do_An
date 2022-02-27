import { VALIDATOR } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
import * as usersService from '@services/users';
import * as boothsService from '@services/booths';
import * as sceneAssetsService from '@services/sceneAssets';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { systemConfig } from '@configs';
import { hasPermissions } from '@helpers/jwt';

const validator = [
  checkSchema({
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
  body('firstName').trim(),
  body('lastName').trim(),
  sanitizeBody('firstName').escape(),
  sanitizeBody('lastName').escape(),
  sanitizeBody('status').customSanitizer((value) => {
    return !!value ? 'ACTIVE' : 'INACTIVE';
  }),
];

export default [
  ...hasPermissions(['updateUser', 'updateOrganizerUser']),
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
      const { id } = req.params;
      const user = await usersService.findOneUserByField({ id });
      if (!user) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      const {
        firstName,
        lastName,
        roleId,
        status,
        email,
        userName,
        phone,
      } = req.body;
      const userWithEmailExist = await usersService.findOneUserByField({
        email,
        id: {
          $ne: user.id,
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
          $ne: user.id,
        },
      });
      if (userWithUsernameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.USER_NAME_ALREADY_IN_USE)
        );
      }
      // If booth owner => Create booth
      if (user.roleId === systemConfig.roles.BOOTH_OWNER) {
        const { boothName, sceneTemplateId } = req.body;
        const booth = await boothsService.findOneBoothByField({
          id: user.boothId,
        });
        // if (sceneTemplateId && sceneTemplateId !== booth.sceneTemplateId) {
        //   await sceneAssetsService.deleteManySceneAsset({
        //     boothId: user.boothId
        //   })
        // }
        await boothsService.updateBooth(booth, {
          name: boothName,
          sceneTemplateId,
          attributes: null,
        });
      }
      // End create booth
      await usersService.updateUser(user, {
        firstName,
        lastName,
        roleId,
        status,
        phone,
      });
      return buildSuccessResponse(res, successData({ id: user.id }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
