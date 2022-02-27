import { VALIDATOR } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
import * as boothsService from '@services/booths';
import * as sceneAssetsService from '@services/sceneAssets';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';
import { uploadFile, removeFile } from '@helpers/file';

const validator = [
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: VALIDATOR.FIELD_REQUIRED('Name'),
      },
    },
  }),
  body('name').trim(),
  sanitizeBody('status').customSanitizer((value) => {
    return !!value ? 'ACTIVE' : 'INACTIVE';
  }),
];

export default [
  ...hasPermissions([
    'updateInfoDesk',
    'updateOrganizerBooth',
    'updateOwnerBooth',
  ]),
  async (req, res, next) => {
    const { id } = req.params;
    const booth = await boothsService.findOneBoothByField({ id });
    if (!booth) {
      const dataErr = errorData(COMMON_CODE.NOT_FOUND);
      return buildErrorResponse(res, dataErr, 404);
    }
    req.booth = booth;
    return uploadFile('avatar', `booths/${booth.id}`)(req, res, next);
  },
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
      const { booth } = req;
      const {
        name,
        status,
        assets: strAssets,
        attributes: strAttributes,
        websiteUrl,
        meetingUrl,
        aboutUs,
        sceneTemplateId,
      } = req.body;
      const boothWithNameExist = await boothsService.findOneBoothByField({
        name,
        id: {
          $ne: booth.id,
        },
      });
      if (boothWithNameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.NAME_ALREADY_IN_USE)
        );
      }
      let avatar = null;
      if (req.file) {
        await removeFile(`booths/${booth.id}/${booth.avatar}`);
        avatar = req.file.key.split('/').pop();
      }
      if (strAssets) {
        const assets = JSON.parse(strAssets);
        const newAssets = [];
        const deleteAssets = [];
        assets.map((asset) => {
          newAssets.push({
            ...asset,
            boothId: booth.id,
          });
          if (asset.oldAssetId) {
            deleteAssets.push({
              boothId: booth.id,
              assetId: asset.oldAssetId,
              key: asset.key,
            });
          }
        });
        await Promise.all(
          deleteAssets.map((deleteAsset) =>
            sceneAssetsService.deleteManySceneAsset(deleteAsset)
          )
        );
        await sceneAssetsService.bulkCreateSceneAsset(newAssets);
      }
      const attributes = strAttributes && JSON.parse(strAttributes);
      await boothsService.updateBooth(booth, {
        name,
        status,
        attributes,
        websiteUrl,
        meetingUrl,
        aboutUs,
        sceneTemplateId,
        ...(avatar && { avatar }),
      });
      return buildSuccessResponse(res, successData({ id: booth.id }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
