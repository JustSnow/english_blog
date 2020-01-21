'use strict';

const bcrypt = require('bcrypt')

// TODO think about sanitization of all attributes or save them as raw string
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
    encryptedPassword: {
      type: DataTypes.STRING
    },
    passwordConfirmation: {
      type: DataTypes.VIRTUAL,
      set: function (value) {
        this.setDataValue('passwordConfirmation', value)
      },
      validate: {
        isPasswordsequal: function (value) {
          if (value != this.password) {
            throw new Error('Password and password confirmation should be equal')
          }
        }
      }
    },
    password: {
      type: DataTypes.VIRTUAL,
      set: function (value) {
        this.setDataValue('password', value)
      },
      validate:{
        isLongEnough: function (value) {
          if (this.passwordConfirmation && value.toString().length < 5) {
            throw new Error('Please choose a longer password. 5 characters at least')
          }
        }
      }
    }
  }, {
    hooks: {
      beforeSave: function (user, options) {
        if (user.password && user.passwordConfirmation) {
          return this.generateHashedPassword(user.password).then(hashedPassword => {
            user.encryptedPassword = hashedPassword
          })
        }
      }
    }
  });

  user.associate = function(models) {
    user.hasMany(models.content, { as: 'contents', onDelete: 'cascade', hooks: true })
    user.hasMany(models.contentCategory, { as: 'contentCategories', onDelete: 'cascade', hooks: true })
  };

  // Class methods
  user.roleValues = () => {
    return user.rawAttributes.role.values
  }

  user.generateHashedPassword = async (password) => {
    return bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT_LENGTH))
  }

  // Instance methods
  user.prototype.isAdmin = function () {
    return this.role == 'admin'
  }

  user.prototype.isManager = function() {
    return this.role == 'manager'
  }

  return user;
};
