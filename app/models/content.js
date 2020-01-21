'use strict';

import SequelizeSlugify from 'sequelize-slugify'
import sanitizeConfig from '../../config/sanitize.js'

const sanitizeHtml = require('sanitize-html')

// TODO think about sanitization of all attributes or save them as raw string
module.exports = (sequelize, DataTypes) => {
  const content = sequelize.define('content', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter content title'
        },
        notEmpty: {
          msg: "Content's title can't be empty"
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
          msg: 'Please enter content description'
        },
        notEmpty: {
          msg: "Content's description can't be empty"
        }
      }
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter content short description'
        },
        notEmpty: {
          msg: "Content's short description can't be empty"
        }
      }
    },
    contentCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please choose content category'
        },
        notEmpty: {
          msg: 'You have to choose one content category at least'
        }
      }
    },
    userId: DataTypes.INTEGER,
    thumbnailPath: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: function (content, options) {
        if (content.changed('shortDescription')) {
          content.shortDescription = sanitizeHtml(content.shortDescription, sanitizeConfig)
        }

        if (content.changed('description')) {
          content.description = sanitizeHtml(content.description, sanitizeConfig)
        }
      }
    }
  });

  SequelizeSlugify.slugifyModel(content, {
    source: ['title'],
    column: 'alias'
  });

  content.associate = function(models) {
    content.belongsTo(models.contentCategory, { foreignKey: 'contentCategoryId', as: 'contentCategory' })
    content.belongsTo(models.user, { as: 'user' })
  };

  return content;
};
