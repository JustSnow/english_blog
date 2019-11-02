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
    let expectedRoutePath = '/content-categories/1'

    it('returns proper path', (done) => {
      expect(LayoutRoutes.contentCategoryPath(1)).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.contentCategoryContentPath', () => {
    let expectedRoutePath = '/content-categories/1/contents/2'

    it('returns proper path', (done) => {
      expect(LayoutRoutes.contentCategoryContentPath(1, 2)).to.equal(expectedRoutePath)
      done()
    })
  })
})
