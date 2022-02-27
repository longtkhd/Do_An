'use strict';
import models from '@models';
const { visits: visitsModel } = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listVisits = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return visitsModel.findAndCountAll({
    where,
    order,
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
  });
};

const getAllVisits = () => {
  return visitsModel.findAll();
};

const findOneVisitByField = (field) => {
  return visitsModel.findOne({
    where: field,
  });
};

const findAllVisitByField = (field) => {
  return visitsModel.findAll({
    where: field,
  });
};

const countVisitByField = (field) => {
  return visitsModel.count({
    where: field,
  });
};

const createVisit = (perAttrs) => {
  return visitsModel.create(perAttrs);
};

const updateVisit = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteVisit = (instance) => {
  return instance.destroy();
};

export {
  listVisits,
  findOneVisitByField,
  createVisit,
  deleteVisit,
  updateVisit,
  getAllVisits,
  countVisitByField,
  findAllVisitByField,
};
