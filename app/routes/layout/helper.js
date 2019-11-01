class LayoutRoutes {
  static rootPath() {
    return '/'
  }

  static contentCategoryPath(contentCategoryId) {
    return `/content-categories/${contentCategoryId}`
  }

  static contentCategoryContentPath(contentCategoryId, contentId) {
    return `/content-categories/${contentCategoryId}/contents/${contentId}`
  }
}

export default LayoutRoutes
