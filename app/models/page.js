'use strict';

module.exports = (sequelize, DataTypes) => {
  const page = sequelize.define('page', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter page title'
        },
        notEmpty: {
          msg: "Page's title can't be empty"
        }
      }
    },
    alias: {
      type: DataTypes.STRING,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter page description'
        },
        notEmpty: {
          msg: "Page's description can't be empty"
        }
      }
    }
  }, {});

  page.associate = function(models) {};

  return page;
};
