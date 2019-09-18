'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'manager', 'regular')
  }, {});
  user.associate = function(models) {
    user.hasMany(models.content, { as: 'contents' })
    user.hasMany(models.contentCategory, { as: 'contentCategories' })
  };
  return user;
};
