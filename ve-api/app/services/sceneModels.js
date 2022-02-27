'use strict';
import models from '@models';
const { sceneModels: sceneModelsModel } = models;

const bulkCreateSceneModel = (sceneModels) => {
  return sceneModelsModel.bulkCreate(sceneModels);
};

const findOneSceneModelByField = (field) => {
  return sceneModelsModel.findOne({
    where: field,
  });
};

const deleteSceneModel = (instance) => {
  return instance.destroy();
};

const deleteManySceneModel = (whereCondition) => {
  return sceneModelsModel.destroy({ where: whereCondition });
};

const getAllByField = (field) => {
  return sceneModelsModel.findAll({
    where: field,
  });
};

export {
  bulkCreateSceneModel,
  deleteSceneModel,
  findOneSceneModelByField,
  deleteManySceneModel,
  getAllByField,
};
