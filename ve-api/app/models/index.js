'use strict';

import { databaseConfig } from '@configs';
import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
const Op = Sequelize.Op;
const config = {
  operatorsAliases: {
    $like: Op.like,
    $ne: Op.ne,
    $in: Op.in,
    $or: Op.or,
    $between: Op.between,
    $and: Op.and,
    $gte: Op.gte,
    $lt: Op.lt,
  },
  host: databaseConfig.host,
  port: databaseConfig.port,
  database: databaseConfig.database,
  userName: databaseConfig.user,
  password: databaseConfig.password,
  dialect: databaseConfig.dialect,
  define: {
    freezeTableName: true,
  },
};

const sequelize = new Sequelize(
  config.database,
  config.userName,
  config.password,
  config
);
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== 'index.js';
  })
  .forEach((file) => {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export const sync = (...args) => {
  return sequelize.sync(...args);
};

export default db;
