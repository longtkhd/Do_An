import bcrypt from 'bcrypt-nodejs';
import { databaseConfig } from '@configs';

export default (sequelize, DataTypes) => {
  const user = sequelize.define(databaseConfig.colUsers, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      notEmpty: true,
      defaultValue: '',
    },
    lastName: {
      type: DataTypes.STRING,
      notEmpty: true,
      defaultValue: '',
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: databaseConfig.colRoles,
        key: 'id',
      },
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['ACTIVE', 'INACTIVE'],
      defaultValue: 'ACTIVE',
    },
    timeSession: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastActivity: {
      type: DataTypes.DATE,
    },
    selfRegister: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  user.prototype.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  user.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  user.associate = (models) => {
    user.belongsTo(models.roles, { foreignKey: 'roleId' });
    user.belongsTo(models.organizers, { foreignKey: 'organizerId' });
    user.belongsTo(models.booths, { foreignKey: 'boothId' });
  };
  return user;
};
