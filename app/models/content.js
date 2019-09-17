'use strict';

module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    title: DataTypes.STRING,
    alias: DataTypes.STRING,
    description: DataTypes.TEXT,
    contentCategoryId: DataTypes.INTEGER
  }, {});
  Content.associate = function(models) {
    Content.belongsTo(models.ContentCategory, { foreignKey: 'contentCategoryId', as: 'contentCategory' })
  };
  return Content;
};
