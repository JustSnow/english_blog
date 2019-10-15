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

  static editContentPath(userId) {
    return `${this.routePrefix}/contents/${userId}/edit`
  }

  static createContentPath() {
    return this.contentsPath()
  }

  static newContentPath() {
    return `${this.routePrefix}/contents/new`
  }

  static updateContentPath(userId) {
    return `${this.routePrefix}/contents/${userId}`
  }

  static deleteContentPath(userId) {
    return this.updateContentPath(userId)
  }

  // content category routes
  static contentCategoriesPath() {
    return `${this.routePrefix}/content-categories`
  }

  static editContentCategoryPath(userId) {
    return `${this.routePrefix}/content-categories/${userId}/edit`
  }

  static createContentCategoryPath() {
    return this.contentCategoriesPath()
  }

  static newContentCategoryPath() {
    return `${this.routePrefix}/content-categories/new`
  }

  static updateContentCategoryPath(userId) {
    return `${this.routePrefix}/content-categories/${userId}`
  }

  static deleteContentCategoryPath(userId) {
    return this.updateContentCategoryPath(userId)
  }
}

export default AdminRoutes
