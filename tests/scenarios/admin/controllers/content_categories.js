const path = require('path')
const mochaHelper = require(path.relative(__dirname, 'tests/support'))

import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

const expect = chai.expect
const factory = mochaHelper.factory
const Models = mochaHelper.Models
const app = mochaHelper.app

describe('ContentCategoriesController', () => {
  describe('GET /admin/content-categories', () => {
    let createdContentCategory

    beforeEach((done) => {
      factory.create('contentCategory').then(contentCategory => {
        createdContentCategory = contentCategory.get()
      }).finally(done)
    })

    it('returns all content categories', (done) => {
      chai.request(app).get('/admin/content-categories').end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.text).to.include(createdContentCategory.title)
        done()
      })
    })
  })

  describe('GET /admin/content-categories/new', () => {
    let contentCategory

    it('responds correctly', (done) => {
      chai.request(app).get('/admin/content-categories/new').end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
    })
  })

  describe('GET /admin/content-categories/:id/edit', () => {
    let createdContentCategory

    beforeEach((done) => {
      factory.create('contentCategory')
        .then(contentCategory => { createdContentCategory = contentCategory })
        .finally(done)
    })

    it('shows proper content category by provided id', (done) => {
      chai.request(app).get(`/admin/content-categories/${createdContentCategory.id}/edit`).end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.text).to.include(createdContentCategory.title)

        done()
      })
    })

    context('when content category for provided id does not exist', () => {
      it('returns 404 page', (done) => {
        chai.request(app).get('/admin/content-categories/blabla/edit').end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
      })
    })
  })

  describe('POST /admin/content-categories', () => {
    let contentCategoryParams

    beforeEach((done) => {
      contentCategoryParams = {
        title: 'test content title',
        alias: 'content alias',
        description: 'content description'
      }

      done()
    })

    it('creates content category with provided params', (done) => {
      chai.request(app).post('/admin/content-categories').send(contentCategoryParams).end((err, res) => {
        let createdContentCategory = Models.contentCategory.findOne({ where: { title: contentCategoryParams.title } })

        createdContentCategory.then(contentCategory => {
          expect(contentCategory.alias).to.equal(contentCategoryParams.alias)
          expect(res).to.redirectTo(new RegExp(`/admin/content-categories/${contentCategory.id}/edit`))
          done()
        }).catch(error => { done(error.message) })
      })
    })
  })

  describe('PUT /admin/content-categories/:id', () => {
    let contentCategory
    let contentCategoryParams

    beforeEach((done) => {
      factory.create('contentCategory').then(category => {
        contentCategory = category
        contentCategoryParams = {
          title: 'New title',
          alias: 'tet'
        }
      }).finally(done)
    })

    it('updates content category with provided params', (done) => {
      chai.request(app).put(`/admin/content-categories/${contentCategory.id}`).send(contentCategoryParams).end((err, res) => {
        contentCategory.reload().then(category => {
          expect(res).to.redirectTo(new RegExp(`/admin/content-categories/${category.id}/edit`))
          expect(category.title).to.equal('New title')
          expect(category.alias).to.equal('tet')
          done()
        }).catch(error => { done(error.message) })
      })
    })

    context('when content category does not exist for provided id', () => {
      it('returns 404 page', (done) => {
        chai.request(app).put('/admin/content-categories/blabla').send(contentCategoryParams).end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
      })
    })
  })

  describe('DELETE /admin/content-categories/:id', () => {
    let createdContentCategory

    beforeEach((done) => {
      factory.create('contentCategory')
        .then(contentCategory => { createdContentCategory = contentCategory })
        .finally(done)
    })

    it('removes content category from db by provided id', (done) => {
      chai.request(app).delete(`/admin/content-categories/${createdContentCategory.id}`).end((err, res) => {
        Models.content.findByPk(createdContentCategory.id).then(contentCategory => {
          expect(res).to.have.status(200)
          expect(contentCategory).to.be.null
          done()
        }).catch(error => { done(error.message) })
      })
    })

    context('when content category does not exist for provided id', () => {
      it('returns 404 page', (done) => {
        chai.request(app).delete('/admin/content-categories/blabla').end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
      })
    })
  })
})
