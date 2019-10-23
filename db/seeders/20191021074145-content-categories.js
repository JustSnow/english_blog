// TODO: investrigate how load all needed libs before start seeds

import factory, { SequelizeAdapter } from 'factory-girl'

const path = require('path')
const adapter = new SequelizeAdapter()
const Models = require(path.relative(__dirname, 'app/models'))

// TODO if we run all seeds, we'll get error about factory already defined
require(path.relative(__dirname, 'tests/factories'))(factory, Models)

factory.setAdapter(adapter)

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
