'use strict';

module.exports = (sequelize, DataTypes) => {
  const contentCategory = sequelize.define('contentCategory', {
    title: DataTypes.STRING,
    alias: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  contentCategory.associate = function(models) {
    contentCategory.hasMany(models.content, { as: 'contents', onDelete: 'cascade', hooks: true })
    contentCategory.belongsTo(models.user, { as: 'user' })
  };
  return contentCategory;
};
