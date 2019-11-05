const path = require('path')
const mochaHelper = require(path.relative(__dirname, 'tests/support'))

import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

const expect = chai.expect
const factory = mochaHelper.factory
const Models = mochaHelper.Models
const app = mochaHelper.app

describe('User model', () => {
  describe('validation', () => {
    describe('password', () => {
      context('when only password was provided', () => {
        let user

        beforeEach((done) => {
          factory.build('user', { password: 123 }).then(buildedUser => {
            user = buildedUser
          }).finally(done)
        })

        it('should not throw error', (done) => {
          user.validate().then(model => {
            done()
          }).catch(error => { done(error.message) })
        })
      })

      context('when password and password confirmation were provided', () => {
        let user

        context('when password and password confirmation are equal', () => {
          beforeEach((done) => {
            factory.build('user', { password: 123, passwordConfirmation: 123 }).then(buildedUser => {
              user = buildedUser
            }).finally(done)
          })

          it('throws validation error', (done) => {
            let expectedMessage = 'Validation error: Please choose a longer password. 5 characters at least'

            user.validate().catch(error => {
              if (error.message == expectedMessage) {
                expect(error.message).to.equal(expectedMessage)
                done()
              } else {
                done(error.message)
              }
            })
          })
        })

        context('when password and password confirmation are not equal', () => {
          beforeEach((done) => {
            factory.build('user', { password: 123, passwordConfirmation: 1234 }).then(buildedUser => {
              user = buildedUser
            }).finally(done)
          })

          it('throws validation error', (done) => {
            let equalPasswordsMessage = 'Validation error: Password and password confirmation should be equal'
            let lengthOfPasswordMessage = 'Validation error: Please choose a longer password. 5 characters at least'

            user.validate().catch(error => {
              let errors = error.message.split(',').map(el => { return el.replace('\n', '').trim() })

              if (errors.includes(equalPasswordsMessage) && errors.includes(lengthOfPasswordMessage)) {
                done()
              } else {
                done(error.message)
              }
            })
          })
        })

        context('when password and password confirmation fit to all requirements', () => {
          beforeEach((done) => {
            factory.build('user', { password: 12345, passwordConfirmation: 12345 }).then(buildedUser => {
              user = buildedUser
            }).finally(done)
          })

          it('should not throw error', (done) => {
            user.validate().then(model => {
              done()
            }).catch(error => { done(error.message) })
          })
        })
      })
    })
  })
})
