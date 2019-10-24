const path = require('path')

import factory, { SequelizeAdapter } from 'factory-girl'
import app from '../../app'

const adapter = new SequelizeAdapter()
const Models = require(path.relative(__dirname, 'app/models'))

factory.setAdapter(adapter)

// clean the factory state - necessary for mocha watch
factory.cleanUp()
factory.factories = []

// define factories
require(path.relative(__dirname, 'tests/factories'))(factory, Models)

module.exports = { Models, factory, app }
