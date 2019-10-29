'use strict';
module.exports = (sequelize, DataTypes) => {
  const page = sequelize.define('page', {
    title: DataTypes.STRING,
    alias: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  page.associate = function(models) {
  };
  return page;
};
