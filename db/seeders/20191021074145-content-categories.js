const path = require('path')
const factoryHelper = require(path.relative(__dirname, 'tests/support/factory_preparation'))
const factory = factoryHelper.factory
const Models = factoryHelper.Models

module.exports = {
  up: (queryInterface, Sequelize) => {
    let contentCategories = []
    let users = Models.user.findAll()

    return new Promise((resolve) => {
      users.then(foundUsers => {
        for(let i = 0; i < 5; i++) {
          let randomUserIndex = Math.floor(Math.random() * 5)
          let randomUser = foundUsers[randomUserIndex]

          contentCategories.push(factory.attrs('contentCategory', { userId: randomUser.id }))
        }

        Promise.all(contentCategories).then(generatedContentCategories => {
          resolve(queryInterface.bulkInsert('content_categories', generatedContentCategories, {}))
        })
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('content_categories', null, {});
  }
};
