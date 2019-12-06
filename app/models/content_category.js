'use strict';

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
    alias: DataTypes.STRING,
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
    tableName: 'content_categories'
  });
  contentCategory.associate = function(models) {
    contentCategory.hasMany(models.content, { as: 'contents', onDelete: 'cascade', hooks: true })
    contentCategory.belongsTo(models.user, { as: 'user' })
  };
  return contentCategory;
};
