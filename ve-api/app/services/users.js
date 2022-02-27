'use strict';
import models from '@models';
const {
  users: usersModel,
  roles: rolesModel,
  organizers: organizersModel,
  booths: boothsModel,
} = models;
import { toFiltersDB, toSortsDB } from '@helpers/filter';

const listUsers = (paginationOptions, sortOptions, filterOptions) => {
  const order = toSortsDB(sortOptions);
  const where = toFiltersDB(filterOptions);
  return usersModel.findAndCountAll({
    where,
    order,
    attributes: [
      'id',
      'firstName',
      'roleId',
      'lastName',
      'userName',
      'email',
      'status',
      'updatedAt',
      'createdAt',
      'phone',
      'boothId',
      'organizerId',
    ],
    limit: paginationOptions.pageSize,
    offset: (paginationOptions.page - 1) * paginationOptions.pageSize,
    include: [
      {
        model: rolesModel,
        attributes: ['id', 'name'],
      },
      {
        model: organizersModel,
        attributes: ['id', 'name'],
      },
      {
        model: boothsModel,
        attributes: ['id', 'name', 'sceneTemplateId'],
      },
    ],
  });
};

const compareUserLogin = (usernameOrEmail) => {
  return usersModel.findOne({
    where: {
      $or: [{ userName: usernameOrEmail }, { email: usernameOrEmail }],
    },
  });
};

const findOneUserByField = (field) => {
  return usersModel.findOne({
    where: field,
    attributes: { exclude: ['password'] },
    include: [
      {
        model: rolesModel,
        attributes: ['id', 'roleAcp', 'name'],
      },
      {
        model: organizersModel,
        attributes: [
          'id',
          'name',
          'lobbyId',
          'boothId',
          'landingId',
          'infoDeskId',
        ],
      },
      {
        model: boothsModel,
        attributes: ['id', 'name', 'sceneTemplateId'],
      },
    ],
  });
};

const countUserByField = (field) => {
  return usersModel.count({
    where: field,
  });
};

const findAllUserByField = (field) => {
  return usersModel.findAll({
    where: field,
    raw: true,
    attributes: { exclude: ['password'] },
  });
};

const findOneUserByFieldIncludeRole = (field) => {
  return usersModel.findOne({
    where: field,
    include: [
      {
        model: rolesModel,
        attributes: ['id', 'roleAcp', 'name'],
      },
      {
        model: organizersModel,
        attributes: [
          'id',
          'name',
          'lobbyId',
          'boothId',
          'landingId',
          'infoDeskId',
        ],
      },
      {
        model: boothsModel,
        attributes: ['id', 'name', 'sceneTemplateId'],
      },
    ],
    attributes: { exclude: ['password'] },
    raw: true,
    nest: true,
  });
};

const createUser = (userAttrs) => {
  let fields = userAttrs;
  const { password } = userAttrs;
  fields.password = usersModel.prototype.generateHash(password);
  return usersModel.create(fields);
};

const updateUser = (instance, fields) => {
  Object.entries(fields).map(([key, value]) => {
    if (key === 'password') {
      instance[key] = usersModel.prototype.generateHash(value);
    } else {
      instance[key] = value;
    }
  });
  return instance.save();
};

const deleteUser = (instance) => {
  return instance.destroy();
};

const deleteManyUser = (whereCondition) => {
  return usersModel.destroy({ where: whereCondition });
};
const initialUser = async () => {
  const userDefault = {
    firstName: 'Admin',
    lastName: 'System',
    email: 'superadmin@gmail.com',
    userName: 'superadmin',
    password: usersModel.prototype.generateHash('superadmin%10%'),
    roleId: 1,
  };

  try {
    await usersModel.create(userDefault);
  } catch (err) {
    console.log(err);
  }
};

export {
  listUsers,
  compareUserLogin,
  initialUser,
  findOneUserByField,
  createUser,
  findOneUserByFieldIncludeRole,
  updateUser,
  deleteUser,
  findAllUserByField,
  deleteManyUser,
  countUserByField,
};
