'use strict';
import models from '@models';
const { landings: landingsModel } = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listLandings = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return landingsModel.findAndCountAll({
    where,
    order,
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
  });
};

const findOneLandingByField = (field) => {
  return landingsModel.findOne({
    where: field,
  });
};

const createLanding = (perAttrs) => {
  return landingsModel.create(perAttrs);
};

const updateLanding = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteLanding = (instance) => {
  return instance.destroy();
};

export {
  listLandings,
  findOneLandingByField,
  createLanding,
  deleteLanding,
  updateLanding,
};
