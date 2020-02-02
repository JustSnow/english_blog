import LayoutRoutes from '../../../../../app/routes/layout/helper'
import chai from 'chai'

const expect = chai.expect

describe('Layout routes', () => {
  describe('.rootPath', () => {
    let expectedRoutePath = '/'

    it('returns proper path', (done) => {
      expect(LayoutRoutes.rootPath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.contentCategoryPath', () => {
    let expectedRoutePath = '/content-categories/test-alias'

    it('returns proper path', (done) => {
      expect(LayoutRoutes.contentCategoryPath('test-alias')).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.contentCategoryContentPath', () => {
    let expectedRoutePath = '/content-categories/test-alias/contents/test-alias'

    it('returns proper path', (done) => {
      expect(LayoutRoutes.contentCategoryContentPath('test-alias', 'test-alias')).to.equal(expectedRoutePath)
      done()
    })
  })
})
