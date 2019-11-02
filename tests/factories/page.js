const faker = require('faker')

module.exports = (factory, Models) => {
  factory.define('page', Models.page, {
    title: () => faker.name.title(),
    alias: () => faker.name.title(),
    description: () => faker.lorem.sentence(400)
  })
}
