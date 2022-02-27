'use strict';
import models from '@models';
const { sceneTemplates: sceneTemplatesModel } = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listSceneTemplates = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return sceneTemplatesModel.findAndCountAll({
    where,
    order,
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
  });
};

const getAllSceneTemplates = () => {
  return sceneTemplatesModel.findAll();
};

const findAllSceneTemplatesByField = (field) => {
  return sceneTemplatesModel.findAll({
    where: field,
  });
};

const findOneSceneTemplateByField = (field) => {
  return sceneTemplatesModel.findOne({
    where: field,
  });
};

const createSceneTemplate = (perAttrs) => {
  return sceneTemplatesModel.create(perAttrs);
};

const updateSceneTemplate = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteSceneTemplate = (instance) => {
  return instance.destroy();
};

export {
  listSceneTemplates,
  findOneSceneTemplateByField,
  createSceneTemplate,
  deleteSceneTemplate,
  updateSceneTemplate,
  getAllSceneTemplates,
  findAllSceneTemplatesByField,
};
