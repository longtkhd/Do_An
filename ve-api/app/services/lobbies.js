'use strict';
import models from '@models';
const {
  lobbies: lobbiesModel,
  sceneTemplates: sceneTemplatesModel,
  assets: assetsModel,
  sceneAssets: sceneAssetsModel,
  halls: hallsModel,
  stages: stagesModel,
  booths: boothsModel,
} = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listLobbies = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return lobbiesModel.findAndCountAll({
    where,
    order,
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
  });
};

const findOneLobbyByField = (field) => {
  return lobbiesModel.findOne({
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
        model: hallsModel,
        attributes: ['id', 'name'],
        through: {
          attributes: ['key', 'index'],
        },
      },
      {
        model: stagesModel,
        attributes: ['id', 'name'],
        through: {
          attributes: ['key', 'index'],
        },
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

const createLobby = (perAttrs) => {
  return lobbiesModel.create(perAttrs);
};

const updateLobby = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteLobby = (instance) => {
  return instance.destroy();
};

export {
  listLobbies,
  findOneLobbyByField,
  createLobby,
  deleteLobby,
  updateLobby,
};
