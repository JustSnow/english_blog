const path = require('path')
const mochaHelper = require(path.relative(__dirname, 'tests/support'))

import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

const expect = chai.expect
const factory = mochaHelper.factory

describe('Content category model', () => {
  describe('hooks', () => {
    describe('beforeSave', () => {
      let contentCategory

      context('when save new contentCategory', () => {
        beforeEach(done => {
          factory.build('contentCategory', {
            shortDescription: 'short blabla<script type="javascript"></script>',
            description: 'description<script type="javascript"></script>'
          }).then(buildedContentCategory => {
            contentCategory = buildedContentCategory
          }).finally(done)
        })

        it('should sanitize shortDescription and description', (done) => {
          contentCategory.save().then(model => {
            expect(model.shortDescription).to.equal('short blabla')
            expect(model.description).to.equal('description')
            done()
          }).catch(error => { done(error.message) })
        })
      })

      context('when update contentCategory', () => {
        let newShortDesc = 'short blabla<script type="javascript"></script>'
        let newDesc = 'description<script type="javascript"></script>'

        beforeEach(done => {
          factory.create('contentCategory').then(buildedContentCategory => {
            contentCategory = buildedContentCategory
          }).finally(done)
        })

        it('should sanitize shortDescription and description', (done) => {
          contentCategory.update({ shortDescription: newShortDesc, description: newDesc }).then(model => {
            expect(model.shortDescription).to.equal('short blabla')
            expect(model.description).to.equal('description')
            done()
          }).catch(error => { done(error.message) })
        })
      })
    })
  })
})
