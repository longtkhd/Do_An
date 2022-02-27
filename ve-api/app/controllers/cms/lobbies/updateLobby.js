import { VALIDATOR } from '@constants';
import {
  validationResult,
  checkSchema,
  body,
  sanitizeBody,
} from 'express-validator';
import * as lobbiesService from '@services/lobbies';
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
import { uploadFileMultiField, removeFile } from '@helpers/file';

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
  ...hasPermissions(['updateLobby']),
  async (req, res, next) => {
    const { id } = req.params;
    const lobby = await lobbiesService.findOneLobbyByField({ id });
    if (!lobby) {
      const dataErr = errorData(COMMON_CODE.NOT_FOUND);
      return buildErrorResponse(res, dataErr, 404);
    }
    req.lobby = lobby;
    const fieldUploads = [
      {
        name: 'logo',
        maxCount: 1,
        destination: `lobbies/${lobby.id}`,
        fileExtension: 'jpeg|jpg|png|gif',
      },
      {
        name: 'favicon',
        maxCount: 1,
        destination: `lobbies/${lobby.id}`,
        fileExtension: 'jpeg|jpg|png|gif',
      },
    ];
    return uploadFileMultiField(fieldUploads)(req, res, next);
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
      const { lobby } = req;
      const {
        name,
        status,
        isWelcomeMsgVisble,
        siteTitle,
        welcomeMsgTitle,
        infoBoothButton,
        organizerBoothButton,
        welcomeMsg,
        assets: strAssets,
        attributes: strAttributes,
        models: strModels,
      } = req.body;
      const lobbyWithNameExist = await lobbiesService.findOneLobbyByField({
        name,
        id: {
          $ne: lobby.id,
        },
      });
      if (lobbyWithNameExist) {
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.NAME_ALREADY_IN_USE)
        );
      }
      // Create asset
      if (strAssets) {
        const assets = JSON.parse(strAssets);
        const newAssets = [];
        const deleteAssets = [];
        assets.map((asset) => {
          newAssets.push({
            ...asset,
            lobbyId: lobby.id,
          });
          if (asset.oldAssetId) {
            deleteAssets.push({
              lobbyId: lobby.id,
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
          const { modelId, modelIdKey, oldModelId } = model;
          if (modelId && modelIdKey) {
            newModels.push({
              ...model,
              [modelIdKey]: modelId,
              lobbyId: lobby.id,
            });
          }
          if (oldModelId && modelIdKey) {
            deleteModels.push({
              [modelIdKey]: oldModelId,
              lobbyId: lobby.id,
            });
          }
        });
        await Promise.all(
          deleteModels.map((deleteModel) =>
            sceneModelsService.deleteManySceneModel(deleteModel)
          )
        );
        await sceneModelsService.bulkCreateSceneModel(newModels || []);
      }
      // Create logo favicon
      let logo, favicon;
      if (req.files) {
        const { logo: fileSiteLogo, favicon: fileFavicon } = req.files;
        if (fileSiteLogo) {
          removeFile(`lobbies/${lobby.id}/${lobby.logo}`);
          logo = fileSiteLogo[0].key.split('/').pop();
        }
        if (fileFavicon) {
          removeFile(`lobbies/${lobby.id}/${lobby.favicon}`);
          favicon = fileFavicon[0].key.split('/').pop();
        }
      }
      const attributes = strAttributes && JSON.parse(strAttributes);
      await lobbiesService.updateLobby(lobby, {
        name,
        status,
        attributes,
        isWelcomeMsgVisble,
        siteTitle,
        welcomeMsgTitle,
        infoBoothButton,
        organizerBoothButton,
        welcomeMsg,
        logo,
        favicon,
      });
      return buildSuccessResponse(res, successData({ id: lobby.id }), 200);
    } catch (err) {
      console.log(err);
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
