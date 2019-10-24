const path = require('path')
const factoryHelper = require(path.relative(__dirname, 'tests/support/factory_preparation'))
const factory = factoryHelper.factory

module.exports = {
  up: (queryInterface, Sequelize) => {
    let users = []

    for(let i = 0; i < 5; i++) {
      users.push(factory.attrs('user'))
    }

    return new Promise((resolve) => {
      Promise.all(users).then(generatedUsers => {
        resolve(queryInterface.bulkInsert('users', generatedUsers, {}))
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
