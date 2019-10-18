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
})
