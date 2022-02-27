'use strict';
import models from '@models';
const { collectors: collectorsModel, users: usersModel } = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listCollectors = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return collectorsModel.findAndCountAll({
    where,
    order,
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
    include: [
      {
        model: usersModel,
        attributes: { exclude: ['password'] },
      },
    ],
  });
};

const getAllCollectors = () => {
  return collectorsModel.findAll();
};

const findOneCollectorByField = (field) => {
  return collectorsModel.findOne({
    where: field,
  });
};

const findAllCollectorByField = (field) => {
  return collectorsModel.findAll({
    where: field,
  });
};

const countCollectorByField = (field) => {
  return collectorsModel.count({
    where: field,
  });
};

const createCollector = (perAttrs) => {
  return collectorsModel
    .create(perAttrs)
    .then(() => findOneCollectorByField(perAttrs));
};

const updateCollector = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteCollector = (instance) => {
  return instance.destroy();
};

export {
  listCollectors,
  findOneCollectorByField,
  createCollector,
  deleteCollector,
  updateCollector,
  getAllCollectors,
  countCollectorByField,
  findAllCollectorByField,
};
