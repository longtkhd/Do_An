'use strict';
import models from '@models';
const {
  booths: boothsModel,
  sceneTemplates: sceneTemplatesModel,
  assets: assetsModel,
  sceneAssets: sceneAssetsModel,
} = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listBooths = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return boothsModel.findAndCountAll({
    where,
    order,
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
  });
};

const getBoothById = (id) => {
  return boothsModel.findOne({ where: { id } });
};

const getAllBooths = () => {
  return boothsModel.findAll();
};

const findOneBoothByField = (field) => {
  return boothsModel.findOne({
    where: field,
    include: [
      {
        model: sceneTemplatesModel,
      },
      {
        model: sceneAssetsModel,
        attributes: ['key', 'assetId'],
        include: [
          {
            model: assetsModel,
            attributes: ['id', 'value'],
          },
        ],
      },
    ],
  });
};

const createBooth = (boothAttrs) => {
  return boothsModel.create(boothAttrs);
};

const updateBooth = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteBooth = (instance) => {
  return instance.destroy();
};

const findAllBoothByField = (field) => {
  return boothsModel.findAll({
    where: field,
    include: [
      {
        model: sceneTemplatesModel,
      },
      {
        model: sceneAssetsModel,
        attributes: ['key', 'assetId'],
        include: [
          {
            model: assetsModel,
            attributes: ['id', 'value'],
          },
        ],
      },
    ],
    raw: true,
  });
};

const deleteManyBooth = (whereCondition) => {
  return boothsModel.destroy({ where: whereCondition });
};

export {
  listBooths,
  getAllBooths,
  getBoothById,
  findOneBoothByField,
  createBooth,
  updateBooth,
  deleteBooth,
  findAllBoothByField,
  deleteManyBooth,
};
