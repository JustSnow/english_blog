class LayoutRoutes {
  static rootPath() {
    return '/'
  }

  static contentCategoryPath(contentCategoryAlias) {
    return `/content-categories/${contentCategoryAlias}`
  }

  static contentCategoryContentPath(contentCategoryAlias, contentAlias) {
    return `/content-categories/${contentCategoryAlias}/contents/${contentAlias}`
  }
}

export default LayoutRoutes
