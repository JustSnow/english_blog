const faker = require('faker')

module.exports = (factory, Models) => {
  factory.define('page', Models.page, {
    title: () => faker.name.title(),
    alias: () => faker.lorem.slug(),
    description: () => faker.lorem.sentence(400)
  })
}
