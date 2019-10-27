'use strict';

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'manager', 'user'),
      defaultValue: 'user'
    },
    // TODO add proper length validation
    // in db store hashed password with long length
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }
    }
  }, {});

  user.associate = function(models) {
    user.hasMany(models.content, { as: 'contents', onDelete: 'cascade', hooks: true })
    user.hasMany(models.contentCategory, { as: 'contentCategories', onDelete: 'cascade', hooks: true })
  };

  user.roleValues = () => {
    return user.rawAttributes.role.values
  }

  user.generateHashedPassword = async (password) => {
    return bcrypt.hash(password, (process.env.PASSWORD_SALT_LENGTH || 8))
  }

  return user;
};
