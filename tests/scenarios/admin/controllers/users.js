const mochaHelper = require('../../../support')

import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../../../app'

chai.use(chaiHttp)

const expect = chai.expect
const factory = mochaHelper.factory
const Models = mochaHelper.Models

describe('UsersController', () => {
  describe('GET /', () => {
    let user1

    beforeEach((done) => {
      factory.create('user').then(user => { user1 = user.get() })
      done()
    })

    it('returns all users', (done) => {
      chai.request(app).get('/admin/users').end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.text).to.include(user1.firstName)
        done()
      })
    })
  })

  describe('GET /new', () => {
    it('responds correctly', (done) => {
      chai.request(app).get('/admin/users/new').end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
    })
  })

  describe('GET /:id', () => {
    let user1

    beforeEach((done) => {
      factory.create('user').then(user => { user1 = user.get() })
      done()
    })

    it('shows proper user by provided id', (done) => {
      chai.request(app).get(`/admin/users/${user1.id}`).end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.text).to.include(user1.firstName)
        done()
      })
    })

    context('when user for provided id does not exist', () => {
      it('returns 404 page', (done) => {
        chai.request(app).get('/admin/users/blabla').end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
      })
    })
  })
})
