// TODO: investrigate how load all needed libs before start seeds

import factory, { SequelizeAdapter } from 'factory-girl'

const path = require('path')
const adapter = new SequelizeAdapter()
const Models = require(path.relative(__dirname, 'app/models'))

require(path.relative(__dirname, 'tests/factories'))(factory, Models)

factory.setAdapter(adapter)

module.exports = {
  up: (queryInterface, Sequelize) => {
    let contents = []
    let contentCategories = Models.contentCategory.findAll()
    let users = Models.user.findAll()

    return new Promise((resolve) => {
      Promise.all([contentCategories, users]).then(results => {
        for(let i = 0; i < 50; i++) {
          let randomUserIndex = Math.floor(Math.random() * 5)
          let randomUser = results[1][randomUserIndex]
          let randomCategoryIndex = Math.floor(Math.random() * 5)
          let randomCategory = results[0][randomCategoryIndex]

          contents.push(factory.attrs('content', { userId: randomUser.id, contentCategoryId: randomCategory.id }))
        }

        Promise.all(contents).then(generatedContentCategories => {
          resolve(queryInterface.bulkInsert('contents', generatedContentCategories, {}))
        })
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('contents', null, {});
  }
};
