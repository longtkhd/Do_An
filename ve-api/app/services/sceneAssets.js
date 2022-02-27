'use strict';
import models from '@models';
const { sceneAssets: sceneAssetsModel } = models;

const bulkCreateSceneAsset = (sceneAssets) => {
  return sceneAssetsModel.bulkCreate(sceneAssets);
};

const findOneSceneAssetByField = (field) => {
  return sceneAssetsModel.findOne({
    where: field,
  });
};

const deleteSceneAsset = (instance) => {
  return instance.destroy();
};

const deleteManySceneAsset = (whereCondition) => {
  return sceneAssetsModel.destroy({ where: whereCondition });
};

const getAllByField = (field) => {
  return sceneAssetsModel.findAll({
    where: field,
  });
};

export {
  bulkCreateSceneAsset,
  deleteSceneAsset,
  findOneSceneAssetByField,
  deleteManySceneAsset,
  getAllByField,
};
