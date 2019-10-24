const faker = require('faker')

module.exports = (factory, Models) => {
  factory.define('contentCategory', Models.contentCategory, {
    title: () => faker.name.title(),
    alias: () => faker.name.title(),
    description: () => faker.lorem.sentence()
  })
}