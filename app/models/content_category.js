'use strict';

import SequelizeSlugify from 'sequelize-slugify'
import sanitizeConfig from '../../config/sanitize.js'

const sanitizeHtml = require('sanitize-html')

module.exports = (sequelize, DataTypes) => {
  const contentCategory = sequelize.define('contentCategory', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter content category title'
        },
        notEmpty: {
          msg: "Content category's title can't be empty"
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
          msg: 'Please enter content category description'
        },
        notEmpty: {
          msg: "Content category's description can't be empty"
        }
      }
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter content category short description'
        },
        notEmpty: {
          msg: "Content category's short description can't be empty"
        }
      }
    },
    userId: DataTypes.INTEGER,
    thumbnailPath: DataTypes.STRING
  }, {
    tableName: 'content_categories',
    hooks: {
      beforeSave: function (contentCategory, options) {
        if (contentCategory.changed('shortDescription')) {
          contentCategory.shortDescription = sanitizeHtml(contentCategory.shortDescription, sanitizeConfig)
        }

        if (contentCategory.changed('description')) {
          contentCategory.description = sanitizeHtml(contentCategory.description, sanitizeConfig)
        }
      }
    }
  });

  SequelizeSlugify.slugifyModel(contentCategory, {
    source: ['title'],
    column: 'alias'
  });

  contentCategory.associate = function(models) {
    contentCategory.hasMany(models.content, { as: 'contents', onDelete: 'cascade', hooks: true })
    contentCategory.belongsTo(models.user, { as: 'user' })
  };

  return contentCategory;
};
