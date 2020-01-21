const path = require('path')
const mochaHelper = require(path.relative(__dirname, 'tests/support'))

import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

const expect = chai.expect
const factory = mochaHelper.factory

describe('Content model', () => {
  describe('hooks', () => {
    describe('beforeSave', () => {
      let content

      context('when save new content', () => {
        beforeEach(done => {
          factory.build('content', {
            shortDescription: 'short blabla<script type="javascript"></script>',
            description: 'description<script type="javascript"></script>'
          }).then(buildedContent => {
            content = buildedContent
          }).finally(done)
        })

        it('should sanitize shortDescription and description', (done) => {
          content.save().then(model => {
            expect(model.shortDescription).to.equal('short blabla')
            expect(model.description).to.equal('description')
            done()
          }).catch(error => { done(error.message) })
        })
      })

      context('when update content', () => {
        let newShortDesc = 'short blabla<script type="javascript"></script>'
        let newDesc = 'description<script type="javascript"></script>'

        beforeEach(done => {
          factory.create('content').then(buildedContent => {
            content = buildedContent
          }).finally(done)
        })

        it('should sanitize shortDescription and description', (done) => {
          content.update({ shortDescription: newShortDesc, description: newDesc }).then(model => {
            expect(model.shortDescription).to.equal('short blabla')
            expect(model.description).to.equal('description')
            done()
          }).catch(error => { done(error.message) })
        })
      })
    })
  })
})
