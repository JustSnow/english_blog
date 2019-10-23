'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    role: {
      type: DataTypes.ENUM('admin', 'manager', 'user'),
      defaultValue: 'user'
    }
  }, {});

  user.associate = function(models) {
    user.hasMany(models.content, { as: 'contents', onDelete: 'cascade', hooks: true })
    user.hasMany(models.contentCategory, { as: 'contentCategories', onDelete: 'cascade', hooks: true })
  };

  user.roleValues = () => {
    return user.rawAttributes.role.values
  }

  return user;
};
