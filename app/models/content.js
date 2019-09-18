'use strict';

module.exports = (sequelize, DataTypes) => {
  const content = sequelize.define('content', {
    title: DataTypes.STRING,
    alias: DataTypes.STRING,
    description: DataTypes.TEXT,
    contentCategoryId: DataTypes.INTEGER
  }, {});
  content.associate = function(models) {
    content.belongsTo(models.contentCategory, { foreignKey: 'contentCategoryId', as: 'contentCategory' })
    content.belongsTo(models.user, { as: 'user' })
  };
  return content;
};
