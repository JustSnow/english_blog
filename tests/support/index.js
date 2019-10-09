import factory, { SequelizeAdapter } from 'factory-girl'

const adapter = new SequelizeAdapter()
const Models = require('../../app/models')

factory.setAdapter(adapter)
// clean the factory state - necessary for mocha watch
factory.cleanUp()
factory.factories = []

// define factories
require('../factories')(factory, Models);

/* uncomment to see UnhandledPromiseRejectionWarning stack traces */
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p)
  console.log('reason:', reason)
})

beforeEach((done) => {
  Models.sequelize.sync({ force: true }).then(function () {
    done()
  })
})

module.exports = {
  factory: factory,
  Models: Models
}
