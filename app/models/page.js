'use strict';

import sanitizeConfig from '../../config/sanitize.js'

const sanitizeHtml = require('sanitize-html')

// TODO think about sanitization of all attributes or save them as raw string
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
  }, {
    hooks: {
      beforeSave: function (page, options) {
        if (page.changed('description')) {
          page.description = sanitizeHtml(page.description, sanitizeConfig)
        }
      }
    }
  });

  page.associate = function(models) {};

  return page;
};
