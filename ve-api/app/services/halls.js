'use strict';
import models from '@models';
const {
  halls: hallsModel,
  sceneTemplates: sceneTemplatesModel,
  assets: assetsModel,
  sceneAssets: sceneAssetsModel,
  booths: boothsModel,
} = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listHalls = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return hallsModel.findAndCountAll({
    where,
    order,
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
  });
};

const getHallById = (id) => {
  return hallsModel.findOne({ where: { id } });
};

const findOneHallByField = (field) => {
  return hallsModel.findOne({
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
      {
        model: boothsModel,
        attributes: ['id', 'name'],
        through: {
          attributes: ['key', 'index'],
        },
      },
    ],
  });
};

const createHall = (hallAttrs) => {
  return hallsModel.create(hallAttrs);
};

const updateHall = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteHall = (instance) => {
  return instance.destroy();
};

const findAllHallByField = (field) => {
  return hallsModel.findAll({
    where: field,
    raw: true,
  });
};

const deleteManyHall = (whereCondition) => {
  return hallsModel.destroy({ where: whereCondition });
};

export {
  listHalls,
  getHallById,
  findOneHallByField,
  createHall,
  updateHall,
  deleteHall,
  findAllHallByField,
  deleteManyHall,
};
