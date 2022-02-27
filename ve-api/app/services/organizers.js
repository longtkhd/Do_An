'use strict';
import models from '@models';
const {
  organizers: organizersModel,
  lobbies: lobbiesModel,
  landings: landingsModel,
} = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listOrganizers = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return organizersModel.findAndCountAll({
    where,
    order,
    attributes: [
      'id',
      'name',
      'organizerAcp',
      'status',
      'updatedAt',
      'createdAt',
    ],
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
  });
};

const getOrganizerById = (id) => {
  return organizersModel.findOne({ where: { id } });
};

const getAllOrganizers = () => {
  return organizersModel.findAll({
    attributes: ['id', 'organizerAcp', 'name'],
  });
};

const findOneOrganizerByField = (field) => {
  return organizersModel.findOne({
    where: field,
    include: [
      {
        model: lobbiesModel,
      },
      {
        model: landingsModel,
      },
    ],
  });
};

const createOrganizer = (organizerAttrs) => {
  return organizersModel.create(organizerAttrs);
};

const updateOrganizer = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    instance[key] = value;
  });
  return instance.save();
};

const deleteOrganizer = (instance) => {
  return instance.destroy();
};

const findAllOrganizerByField = (field) => {
  return organizersModel.findAll({
    where: field,
    raw: true,
  });
};

const deleteManyOrganizer = (whereCondition) => {
  return organizersModel.destroy({ where: whereCondition });
};

export {
  listOrganizers,
  getAllOrganizers,
  getOrganizerById,
  findOneOrganizerByField,
  createOrganizer,
  updateOrganizer,
  deleteOrganizer,
  findAllOrganizerByField,
  deleteManyOrganizer,
};
