const faker = require('faker')

module.exports = (factory, Models) => {
  factory.define('content', Models.content, {
    title: () => faker.name.title(),
    alias: () => faker.name.title(),
    description: () => faker.lorem.sentence(),
    contentCategoryId: factory.assoc('contentCategory', 'id'),
    userId: factory.assoc('user', 'id')
  })
}