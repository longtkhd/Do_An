'use strict';
import models from '@models';
const {
  resourceHubs: resourceHubsModel,
  assets: assetsModel,
  booths: boothsModel,
} = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listResourceHubs = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return resourceHubsModel.findAndCountAll({
    where,
    order,
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
    include: [
      {
        model: assetsModel,
      },
    ],
  });
};

const getAllResourceHubs = () => {
  return resourceHubsModel.findAll();
};

const findOneResourceHubByField = (field) => {
  return resourceHubsModel.findOne({
    where: field,
    include: [
      {
        model: assetsModel,
      },
    ],
  });
};

const findAllResourceHubByField = (field) => {
  return resourceHubsModel.findAll({
    where: field,
    order: [['createdAt', 'desc']],
    include: [
      {
        model: assetsModel,
      },
    ],
  });
};

const createResourceHub = (perAttrs) => {
  return resourceHubsModel.create(perAttrs);
};

const bulkCreateResourceHub = (resourceHubs) => {
  return resourceHubsModel.bulkCreate(resourceHubs);
};

const updateResourceHub = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteResourceHub = (instance) => {
  return instance.destroy();
};

export {
  listResourceHubs,
  findOneResourceHubByField,
  findAllResourceHubByField,
  createResourceHub,
  deleteResourceHub,
  updateResourceHub,
  getAllResourceHubs,
  bulkCreateResourceHub,
};
