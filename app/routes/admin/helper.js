class AdminRoutes{
  static routePrefix = '/admin'

  // user routes
  static usersPath() {
    return `${this.routePrefix}/users`
  }

  static editUserPath(userId) {
    return `${this.routePrefix}/users/${userId}/edit`
  }

  static createUserPath() {
    return this.usersPath()
  }

  static newUserPath() {
    return `${this.routePrefix}/users/new`
  }

  static updateUserPath(userId) {
    return `${this.routePrefix}/users/${userId}`
  }

  static deleteUserPath(userId) {
    return this.updateUserPath(userId)
  }

  // content routes
  static contentsPath() {
    return `${this.routePrefix}/contents`
  }

  static editContentPath(contentId) {
    return `${this.routePrefix}/contents/${contentId}/edit`
  }

  static createContentPath() {
    return this.contentsPath()
  }

  static newContentPath() {
    return `${this.routePrefix}/contents/new`
  }

  static updateContentPath(contentId) {
    return `${this.routePrefix}/contents/${contentId}`
  }

  static deleteContentPath(contentId) {
    return this.updateContentPath(contentId)
  }

  // content category routes
  static contentCategoriesPath() {
    return `${this.routePrefix}/content-categories`
  }

  static editContentCategoryPath(contentCategoryId) {
    return `${this.routePrefix}/content-categories/${contentCategoryId}/edit`
  }

  static createContentCategoryPath() {
    return this.contentCategoriesPath()
  }

  static newContentCategoryPath() {
    return `${this.routePrefix}/content-categories/new`
  }

  static updateContentCategoryPath(contentCategoryId) {
    return `${this.routePrefix}/content-categories/${contentCategoryId}`
  }

  static deleteContentCategoryPath(contentCategoryId) {
    return this.updateContentCategoryPath(contentCategoryId)
  }

  // page routes
  static pagesPath() {
    return `${this.routePrefix}/pages`
  }

  static editPagePath(pageId) {
    return `${this.routePrefix}/pages/${pageId}/edit`
  }

  static createPagePath() {
    return this.pagesPath()
  }

  static newPagePath() {
    return `${this.routePrefix}/pages/new`
  }

  static updatePagePath(pageId) {
    return `${this.routePrefix}/pages/${pageId}`
  }

  static deletePagePath(pageId) {
    return this.updatePagePath(pageId)
  }
}

export default AdminRoutes
