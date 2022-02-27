import { VALIDATOR } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
import * as hallsService from '@services/halls';
import * as sceneAssetsService from '@services/sceneAssets';
import * as sceneModelsService from '@services/sceneModels';
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
  ...hasPermissions(['updateHall']),
  async (req, res, next) => {
    const { id } = req.params;
    const hall = await hallsService.findOneHallByField({ id });
    if (!hall) {
      const dataErr = errorData(COMMON_CODE.NOT_FOUND);
      return buildErrorResponse(res, dataErr, 404);
    }
    req.hall = hall;
    return uploadFile('avatar', `halls/${hall.id}`)(req, res, next);
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
      const { hall } = req;
      const {
        name,
        status,
        boothNumber,
        assets: strAssets,
        attributes: strAttributes,
        models: strModels,
        sceneTemplateId,
      } = req.body;
      const hallWithNameExist = await hallsService.findOneHallByField({
        name,
        id: {
          $ne: hall.id,
        },
      });
      if (hallWithNameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.NAME_ALREADY_IN_USE)
        );
      }
      let avatar = null;
      if (req.file) {
        await removeFile(`halls/${hall.id}/${hall.avatar}`);
        avatar = req.file.key.split('/').pop();
      }
      if (strAssets) {
        const assets = JSON.parse(strAssets);
        const newAssets = [];
        const deleteAssets = [];
        assets.map((asset) => {
          newAssets.push({
            ...asset,
            hallId: hall.id,
          });
          if (asset.oldAssetId) {
            deleteAssets.push({
              hallId: hall.id,
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
      // Create model
      if (strModels) {
        const models = JSON.parse(strModels);
        const newModels = [];
        const deleteModels = [];
        models.map((model) => {
          const { modelId, modelIdKey, oldModelId, index } = model;
          if (modelId && modelIdKey && index < boothNumber) {
            newModels.push({
              ...model,
              [modelIdKey]: modelId,
              hallId: hall.id,
            });
          }
          if (oldModelId && modelIdKey) {
            deleteModels.push({
              [modelIdKey]: oldModelId,
              hallId: hall.id,
            });
          }
        });
        await Promise.all(
          deleteModels.map((deleteModel) =>
            sceneModelsService.deleteManySceneModel(deleteModel)
          )
        );
        // Delete all scene template >= boothNumber
        sceneModelsService.deleteManySceneModel({
          hallId: hall.id,
          index: {
            $gte: boothNumber,
          },
        });
        await sceneModelsService.bulkCreateSceneModel(newModels || []);
      }
      const attributes = strAttributes && JSON.parse(strAttributes);
      await hallsService.updateHall(hall, {
        name,
        status,
        attributes,
        sceneTemplateId,
        ...(avatar && { avatar }),
      });
      return buildSuccessResponse(res, successData({ id: hall.id }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
