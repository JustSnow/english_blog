import factory, { SequelizeAdapter } from 'factory-girl'

const path = require('path')
const adapter = new SequelizeAdapter()
const Models = require(path.relative(__dirname, 'app/models'))

require(path.relative(__dirname, 'tests/factories'))(factory, Models)

factory.setAdapter(adapter)

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
