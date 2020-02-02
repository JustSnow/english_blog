const faker = require('faker')

module.exports = (factory, Models) => {
  factory.define('contentCategory', Models.contentCategory, {
    title: () => faker.name.title(),
    alias: () => faker.lorem.slug(),
    description: () => faker.lorem.sentence(150),
    shortDescription: () => faker.lorem.sentence(15)
  })
}
