'use strict';

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
    alias: DataTypes.STRING,
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
