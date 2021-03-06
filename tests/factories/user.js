const faker = require('faker')

module.exports = (factory, Models) => {
  factory.define('user', Models.user, {
    firstName: () => faker.name.findName(),
    lastName: () => faker.name.findName(),
    email: () => faker.internet.email(),
    role: () => faker.random.arrayElement(Models.user.roleValues()),
    encryptedPassword: Models.user.generateHashedPassword('123456').then(password => { return password })
  });

  factory.extend('user', 'admin', {
    role: 'admin',
    email: 'admin@admin.com'
  });
}
