// try to use here path.relative
const mochaHelper = require('../../../support')

import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

const expect = chai.expect
const factory = mochaHelper.factory
const Models = mochaHelper.Models
const app = mochaHelper.app

describe('UsersController', () => {
  describe('GET /admin/users', () => {
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

  describe('GET /admin/users/new', () => {
    it('responds correctly', (done) => {
      chai.request(app).get('/admin/users/new').end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
    })
  })

  describe('GET /admin/users/:id/edit', () => {
    let user1

    beforeEach((done) => {
      factory.create('user').then(user => { user1 = user.get() })
      done()
    })

    it('shows proper user by provided id', (done) => {
      chai.request(app).get(`/admin/users/${user1.id}/edit`).end((err, res) => {
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

  describe('DELETE /admin/users/:id', () => {
    let user1

    beforeEach((done) => {
      factory.create('user').then(user => { user1 = user.get() })
      done()
    })

    it('removes user from db by provided id', (done) => {
      chai.request(app).delete(`/admin/users/${user1.id}`).end((err, res) => {
        Models.user.findByPk(user1.id).then(user => {
          expect(res).to.have.status(200)
          expect(user).to.be.null
          done()
        })
      })
    })

    context('when user for provided id does not exist', () => {
      it('returns 404 page', (done) => {
        chai.request(app).delete('/admin/users/blabla').end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
      })
    })
  })

  describe('POST /admin/users', () => {
    let userParams = {
      firstName: 'test First name',
      lastName: 'test Last Name',
      email: 'blabla@gmail.com'
    }

    it('creates a user by provided params', (done) => {
      chai.request(app).post('/admin/users').send(userParams).end((err, res) => {
        expect(res).to.redirectTo(/\/admin\/users\/\d+\/edit/)
        done()
      })
    })
  })

  describe('PUT /admin/users/:id', () => {
    let user1
    let userParams = {
      firstName: 'test First name',
      lastName: 'test Last Name',
      email: 'blabla@gmail.com'
    }

    beforeEach((done) => {
      factory.create('user', { firstName: 'FIRST NAME' }).then(user => { user1 = user.get() })
      done()
    })

    it('updates user by provided id', (done) => {
      chai.request(app).put(`/admin/users/${user1.id}`).send(userParams).end((err, res) => {
        let updatedUser = Models.user.findByPk(user1.id).then(user => {
          expect(user.firstName).to.equal(userParams.firstName)

          return Promise.resolve(user)
        }).catch(error => { done(error.message) })

        updatedUser.then(user => {
          expect(res).to.redirectTo(new RegExp(`/admin/users/${user.id}/edit`))
          done()
        }).catch(error => { done(error.message) })
      })
    })

    context('when user for provided id does not exist', () => {
      it('returns 404 page', (done) => {
        chai.request(app).put('/admin/users/blabla').send(userParams).end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
      })
    })
  })
})
