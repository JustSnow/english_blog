const faker = require('faker')

module.exports = (factory, Models) => {
  factory.define('content', Models.content, {
    title: () => faker.name.title(),
    alias: () => faker.name.title(),
    description: () => faker.lorem.sentence(150),
    shortDescription: () => faker.lorem.sentence(15),
    contentCategoryId: factory.assoc('contentCategory', 'id'),
    userId: factory.assoc('user', 'id')
  })
}
