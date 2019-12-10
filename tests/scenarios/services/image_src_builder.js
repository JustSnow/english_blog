import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

const expect = chai.expect
const path = require('path')
const srcBuilder = require(path.relative(__dirname, 'app/services/image_src_builder'))

describe('imageSrcBuilder', () => {
  const imagesRoutePath = '/scale/images'
  let expectedSrc

  context('when we does not provide any image options', () => {
    beforeEach((done) => {
      let encodedOptions = Buffer.from(JSON.stringify({})).toString('base64')
      expectedSrc = `${imagesRoutePath}?options=${encodedOptions}`
      done()
    })

    it('returns right image src', (done) => {
      expect(srcBuilder.default()).to.equal(expectedSrc)
      done()
    })
  })

  context('when some options were provided', () => {
    let imageOptions = { width: 100, height: 100, bla: 'bla' }

    beforeEach((done) => {
      let encodedOptions = Buffer.from(JSON.stringify(imageOptions)).toString('base64')
      expectedSrc = `${imagesRoutePath}?options=${encodedOptions}`
      done()
    })

    it('returns right image src', (done) => {
      expect(srcBuilder.default(imageOptions)).to.equal(expectedSrc)
      done()
    })
  })
})
