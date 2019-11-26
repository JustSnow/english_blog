'use strict';

module.exports = (sequelize, DataTypes) => {
  const content = sequelize.define('content', {
    title: DataTypes.STRING,
    alias: DataTypes.STRING,
    description: DataTypes.TEXT,
    shortDescription: DataTypes.TEXT,
    contentCategoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    thumbnailPath: DataTypes.STRING
  }, {});
  content.associate = function(models) {
    content.belongsTo(models.contentCategory, { foreignKey: 'contentCategoryId', as: 'contentCategory' })
    content.belongsTo(models.user, { as: 'user' })
  };
  return content;
};
