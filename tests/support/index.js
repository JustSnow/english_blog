import { app, factory, Models } from './factory_preparation'

/* uncomment to see UnhandledPromiseRejectionWarning stack traces */
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p)
  console.log('reason:', reason)
})

beforeEach((done) => {
  Models.sequelize.sync({ force: true, logging: false }).then(function () {
    done()
  })
})

module.exports = { factory, Models, app }
