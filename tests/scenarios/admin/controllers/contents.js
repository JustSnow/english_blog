// try to use here path.relative
const mochaHelper = require('../../../support')

import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

const expect = chai.expect
const factory = mochaHelper.factory
const Models = mochaHelper.Models
const app = mochaHelper.app

describe('ContentsController', () => {
  describe('GET /admin/contents', () => {
    let createdContent

    beforeEach((done) => {
      factory.create('content').then(content => {
        createdContent = content.get()
      }).finally(done)
    })

    it('returns all contents', (done) => {
      chai.request(app).get('/admin/contents').end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.text).to.include(createdContent.title)
        done()
      })
    })
  })

  describe('GET /admin/contents/new', () => {
    let contentCategory

    beforeEach((done) => {
      factory.create('contentCategory')
        .then(category => { contentCategory = category.get() })
        .finally(done)
    })

    it('responds correctly', (done) => {
      chai.request(app).get('/admin/contents/new').end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.text).to.include(contentCategory.title)
        done()
      })
    })
  })

  describe('GET /admin/contents/:id/edit', () => {
    let createdContent

    beforeEach((done) => {
      factory.create('content')
        .then(content => { createdContent = content })
        .finally(done)
    })

    it('shows proper content by provided id', (done) => {
      chai.request(app).get(`/admin/contents/${createdContent.id}/edit`).end((err, res) => {
        createdContent.getContentCategory().then(category => {
          expect(res).to.have.status(200)
          expect(res.text).to.include(createdContent.title)
          expect(res.text).to.include(category.title)

          done()
        }).catch(error => { done(error) })
      })
    })

    context('when content for provided id does not exist', () => {
      it('returns 404 page', (done) => {
        chai.request(app).get('/admin/contents/blabla/edit').end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
      })
    })
  })

  describe('POST /admin/contents', () => {
    let contentCategory
    let contentParams

    beforeEach((done) => {
      factory.create('contentCategory')
        .then(category => {
          contentCategory = category
          contentParams = {
            title: 'test content title',
            alias: 'content alias',
            description: 'content description',
            contentCategoryId: contentCategory.id
          }
        })
        .finally(done)
    })

    it('creates content with provided params', (done) => {
      chai.request(app).post('/admin/contents').send(contentParams).end((err, res) => {
        let createContent = Models.content.findOne({ where: { title: contentParams.title } })

        createContent.then(content => {
          expect(content.alias).to.equal(contentParams.alias)
          expect(res).to.redirectTo(new RegExp(`/admin/contents/${content.id}/edit`))
          done()
        }).catch(error => { done(error.message) })
      })
    })
  })
})
