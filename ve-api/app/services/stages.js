'use strict';
import models from '@models';
const {
  stages: stagesModel,
  sceneTemplates: sceneTemplatesModel,
  assets: assetsModel,
  sceneAssets: sceneAssetsModel,
} = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listStages = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return stagesModel.findAndCountAll({
    where,
    order,
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
  });
};

const getStageById = (id) => {
  return stagesModel.findOne({ where: { id } });
};

const getAllStages = () => {
  return stagesModel.findAll();
};

const findOneStageByField = (field) => {
  return stagesModel.findOne({
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

const createStage = (stageAttrs) => {
  return stagesModel.create(stageAttrs);
};

const updateStage = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteStage = (instance) => {
  return instance.destroy();
};

const findAllStageByField = (field) => {
  return stagesModel.findAll({
    where: field,
    raw: true,
  });
};

const deleteManyStage = (whereCondition) => {
  return stagesModel.destroy({ where: whereCondition });
};

export {
  listStages,
  getAllStages,
  getStageById,
  findOneStageByField,
  createStage,
  updateStage,
  deleteStage,
  findAllStageByField,
  deleteManyStage,
};
