import { COMMON_CODE } from '../constants/codes';

export const successData = (data, code = COMMON_CODE.SUCCESS, extra = {}) => {
  return {
    data,
    code,
    extra,
  };
};

export const errorData = (
  code = COMMON_CODE.UNKNOWN_ERROR,
  message = '',
  extra = {}
) => {
  return {
    code,
    message,
    extra,
  };
};

export const buildSuccessResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json(data);
};

export const paginationData = (data, pagination) => {
  return {
    data,
    pagination,
  };
};

export const buildErrorResponse = (res, data, statusCode = 400) => {
  return res.status(statusCode).json(data);
};

export const buildAssetsResponse = (model) => {
  model = model.toJSON();
  model.assets = model.sceneAssets.map((item) => ({
    key: item.key,
    value: item.asset.value,
    id: item.asset.id,
    assetId: item.asset.id,
  }));
  delete model.sceneAssets;
  return model;
};
