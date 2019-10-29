import AdminRoutes from '../../../../app/routes/admin/helper'
import chai from 'chai'

const expect = chai.expect

describe('user routes', () => {
  describe('.usersPath', () => {
    let expectedRoutePath = '/admin/users'

    it('returns proper path', (done) => {
      expect(AdminRoutes.usersPath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.editUserPath', () => {
    let expectedRoutePath = '/admin/users/1/edit'

    it('returns proper path', (done) => {
      expect(AdminRoutes.editUserPath(1)).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.createUserPath', () => {
    let expectedRoutePath = '/admin/users'

    it('returns proper path', (done) => {
      expect(AdminRoutes.createUserPath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.newUserPath', () => {
    let expectedRoutePath = '/admin/users/new'

    it('returns proper path', (done) => {
      expect(AdminRoutes.newUserPath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.updateUserPath', () => {
    let expectedRoutePath = '/admin/users/2'

    it('returns proper path', (done) => {
      expect(AdminRoutes.updateUserPath(2)).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.deleteUserPath', () => {
    let expectedRoutePath = '/admin/users/1'

    it('returns proper path', (done) => {
      expect(AdminRoutes.deleteUserPath(1)).to.equal(expectedRoutePath)
      done()
    })
  })
})

describe('content routes', () => {
  describe('.contentsPath', () => {
    let expectedRoutePath = '/admin/contents'

    it('returns proper path', (done) => {
      expect(AdminRoutes.contentsPath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.editContentPath', () => {
    let expectedRoutePath = '/admin/contents/1/edit'

    it('returns proper path', (done) => {
      expect(AdminRoutes.editContentPath(1)).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.createContentPath', () => {
    let expectedRoutePath = '/admin/contents'

    it('returns proper path', (done) => {
      expect(AdminRoutes.createContentPath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.newContentPath', () => {
    let expectedRoutePath = '/admin/contents/new'

    it('returns proper path', (done) => {
      expect(AdminRoutes.newContentPath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.updateContentPath', () => {
    let expectedRoutePath = '/admin/contents/2'

    it('returns proper path', (done) => {
      expect(AdminRoutes.updateContentPath(2)).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.deleteContentPath', () => {
    let expectedRoutePath = '/admin/contents/1'

    it('returns proper path', (done) => {
      expect(AdminRoutes.deleteContentPath(1)).to.equal(expectedRoutePath)
      done()
    })
  })
})

describe('content category routes', () => {
  describe('.contentCategoriesPath', () => {
    let expectedRoutePath = '/admin/content-categories'

    it('returns proper path', (done) => {
      expect(AdminRoutes.contentCategoriesPath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.editContentCategoryPath', () => {
    let expectedRoutePath = '/admin/content-categories/1/edit'

    it('returns proper path', (done) => {
      expect(AdminRoutes.editContentCategoryPath(1)).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.createContentCategoryPath', () => {
    let expectedRoutePath = '/admin/content-categories'

    it('returns proper path', (done) => {
      expect(AdminRoutes.createContentCategoryPath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.newContentCategoryPath', () => {
    let expectedRoutePath = '/admin/content-categories/new'

    it('returns proper path', (done) => {
      expect(AdminRoutes.newContentCategoryPath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.updateContentCategoryPath', () => {
    let expectedRoutePath = '/admin/content-categories/2'

    it('returns proper path', (done) => {
      expect(AdminRoutes.updateContentCategoryPath(2)).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.deleteContentCategoryPath', () => {
    let expectedRoutePath = '/admin/content-categories/1'

    it('returns proper path', (done) => {
      expect(AdminRoutes.deleteContentCategoryPath(1)).to.equal(expectedRoutePath)
      done()
    })
  })
})

describe('page routes', () => {
  describe('.pagesPath', () => {
    let expectedRoutePath = '/admin/pages'

    it('returns proper path', (done) => {
      expect(AdminRoutes.pagesPath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.editPagePath', () => {
    let expectedRoutePath = '/admin/pages/1/edit'

    it('returns proper path', (done) => {
      expect(AdminRoutes.editPagePath(1)).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.createPagePath', () => {
    let expectedRoutePath = '/admin/pages'

    it('returns proper path', (done) => {
      expect(AdminRoutes.createPagePath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.newPagePath', () => {
    let expectedRoutePath = '/admin/pages/new'

    it('returns proper path', (done) => {
      expect(AdminRoutes.newPagePath()).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.updatePagePath', () => {
    let expectedRoutePath = '/admin/pages/2'

    it('returns proper path', (done) => {
      expect(AdminRoutes.updatePagePath(2)).to.equal(expectedRoutePath)
      done()
    })
  })

  describe('.deletePagePath', () => {
    let expectedRoutePath = '/admin/pages/1'

    it('returns proper path', (done) => {
      expect(AdminRoutes.deletePagePath(1)).to.equal(expectedRoutePath)
      done()
    })
  })
})
