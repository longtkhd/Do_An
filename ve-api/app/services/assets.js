'use strict';
import models from '@models';
const { assets: assetsModel } = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listAssets = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return assetsModel.findAndCountAll({
    where,
    order,
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
  });
};

const getAllAssets = () => {
  return assetsModel.findAll();
};

const findOneAssetByField = (field) => {
  return assetsModel.findOne({
    where: field,
  });
};

const createAsset = (perAttrs) => {
  return assetsModel.create(perAttrs);
};

const updateAsset = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteAsset = (instance) => {
  return instance.destroy();
};

export {
  listAssets,
  findOneAssetByField,
  createAsset,
  deleteAsset,
  updateAsset,
  getAllAssets,
};
