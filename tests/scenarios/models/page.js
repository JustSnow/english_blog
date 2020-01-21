const path = require('path')
const mochaHelper = require(path.relative(__dirname, 'tests/support'))

import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

const expect = chai.expect
const factory = mochaHelper.factory

describe('Page model', () => {
  describe('hooks', () => {
    describe('beforeSave', () => {
      let page

      context('when save new page', () => {
        beforeEach(done => {
          factory.build('page', {
            description: 'description<script type="javascript"></script>'
          }).then(buildedPage => {
            page = buildedPage
          }).finally(done)
        })

        it('should sanitize shortDescription and description', (done) => {
          page.save().then(model => {
            expect(model.description).to.equal('description')
            done()
          }).catch(error => { done(error.message) })
        })
      })

      context('when update page', () => {
        let newDesc = 'description<script type="javascript"></script>'

        beforeEach(done => {
          factory.create('page').then(buildedPage => {
            page = buildedPage
          }).finally(done)
        })

        it('should sanitize shortDescription and description', (done) => {
          page.update({ description: newDesc }).then(model => {
            expect(model.description).to.equal('description')
            done()
          }).catch(error => { done(error.message) })
        })
      })
    })
  })
})
