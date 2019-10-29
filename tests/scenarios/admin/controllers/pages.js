const path = require('path')
const mochaHelper = require(path.relative(__dirname, 'tests/support'))

import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

const expect = chai.expect
const factory = mochaHelper.factory
const Models = mochaHelper.Models
const app = mochaHelper.app

describe('PagesController', () => {
  describe('GET /admin/pages', () => {
    let createdPage

    beforeEach((done) => {
      factory.create('page').then(page => {
        createdPage = page.get()
      }).finally(done)
    })

    it('returns all pages', (done) => {
      chai.request(app).get('/admin/pages').end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.text).to.include(createdPage.title)
        done()
      })
    })
  })

  describe('GET /admin/pages/new', () => {
    let page

    it('responds correctly', (done) => {
      chai.request(app).get('/admin/pages/new').end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
    })
  })

  describe('GET /admin/pages/:id/edit', () => {
    let createdPage

    beforeEach((done) => {
      factory.create('page')
        .then(page => { createdPage = page })
        .finally(done)
    })

    it('shows proper page by provided id', (done) => {
      chai.request(app).get(`/admin/pages/${createdPage.id}/edit`).end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.text).to.include(createdPage.title)

        done()
      })
    })

    context('when page for provided id does not exist', () => {
      it('returns 404 page', (done) => {
        chai.request(app).get('/admin/pages/blabla/edit').end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
      })
    })
  })

  describe('POST /admin/pages', () => {
    let pageParams

    beforeEach((done) => {
      pageParams = {
        title: 'test content title',
        alias: 'content alias',
        description: 'content description'
      }

      done()
    })

    it('creates page with provided params', (done) => {
      chai.request(app).post('/admin/pages').send(pageParams).end((err, res) => {
        let createdPage = Models.page.findOne({ where: { title: pageParams.title } })

        createdPage.then(page => {
          expect(page.alias).to.equal(pageParams.alias)
          expect(res).to.redirectTo(new RegExp(`/admin/pages/${page.id}/edit`))
          done()
        }).catch(error => { done(error.message) })
      })
    })
  })

  describe('PUT /admin/pages/:id', () => {
    let page
    let pageParams

    beforeEach((done) => {
      factory.create('page').then(category => {
        page = category
        pageParams = {
          title: 'New title',
          alias: 'tet'
        }
      }).finally(done)
    })

    it('updates page with provided params', (done) => {
      chai.request(app).put(`/admin/pages/${page.id}`).send(pageParams).end((err, res) => {
        page.reload().then(category => {
          expect(res).to.redirectTo(new RegExp(`/admin/pages/${category.id}/edit`))
          expect(category.title).to.equal('New title')
          expect(category.alias).to.equal('tet')
          done()
        }).catch(error => { done(error.message) })
      })
    })

    context('when page does not exist for provided id', () => {
      it('returns 404 page', (done) => {
        chai.request(app).put('/admin/pages/blabla').send(pageParams).end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
      })
    })
  })

  describe('DELETE /admin/pages/:id', () => {
    let createdPage

    beforeEach((done) => {
      factory.create('page')
        .then(page => { createdPage = page })
        .finally(done)
    })

    it('removes page from db by provided id', (done) => {
      chai.request(app).delete(`/admin/pages/${createdPage.id}`).end((err, res) => {
        Models.content.findByPk(createdPage.id).then(page => {
          expect(res).to.have.status(200)
          expect(page).to.be.null
          done()
        }).catch(error => { done(error.message) })
      })
    })

    context('when page does not exist for provided id', () => {
      it('returns 404 page', (done) => {
        chai.request(app).delete('/admin/pages/blabla').end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
      })
    })
  })
})
