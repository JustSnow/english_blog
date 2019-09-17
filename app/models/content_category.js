'use strict';

module.exports = (sequelize, DataTypes) => {
  const ContentCategory = sequelize.define('ContentCategory', {
    title: DataTypes.STRING,
    alias: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  ContentCategory.associate = function(models) {
    ContentCategory.hasMany(models.Content, { as: 'contents' })
  };
  return ContentCategory;
};
