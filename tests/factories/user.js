const factory = require('factory-girl').factory
const User = require('../../app/models/user')
const faker = require('faker')

const userFactory = factory.define('user', User, {
  firstName: () => faker.name.findName(),
  lastName: () => faker.name.findName(),
  email: () => faker.internet.email
})

export default userFactory
