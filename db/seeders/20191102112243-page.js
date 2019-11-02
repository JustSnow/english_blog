const path = require('path')
const factoryHelper = require(path.relative(__dirname, 'tests/support/factory_preparation'))
const factory = factoryHelper.factory

module.exports = {
  up: (queryInterface, Sequelize) => {
    let aliases = ['about', 'policy-and-privacy', 'contacts']
    let pages = []

    aliases.forEach((alias) => {
      pages.push(factory.attrs('page', { alias: alias }))
    })

    return new Promise((resolve) => {
      Promise.all(pages).then(generatedPages => {
        resolve(queryInterface.bulkInsert('pages', generatedPages, {}))
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pages', null, {})
  }
};
