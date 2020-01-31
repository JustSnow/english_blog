const path = require('path')
const factoryHelper = require(path.relative(__dirname, 'tests/support/factory_preparation'))
const factory = factoryHelper.factory
const Models = factoryHelper.Models

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise(resolve => {
      factory.attrs('admin').then(adminAttrs => {
        resolve(queryInterface.bulkInsert('users', [adminAttrs]))
      }).catch(err => console.log(err))
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', { email: 'admin@admin.com' })
  }
};
