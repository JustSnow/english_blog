'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      alias: {
        type: Sequelize.STRING,
        unique: true
      },
      shortDescription: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      contentCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      thumbnailPath: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    }).then(() => {
      queryInterface.addIndex('contents', ['contentCategoryId'])
      queryInterface.addIndex('contents', ['userId'])
      queryInterface.addIndex('contents', ['contentCategoryId', 'alias'])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('contents');
  }
};
