import db from '../../models'
import createError from 'http-errors'

class ContentCategoriesController {
  static async show(req, res, next) {
    const { alias } = req.params

    try {
      db.contentCategory.findOne({ where: { alias } }).then(contentCategory => {
        if (contentCategory === null) { throw new createError.NotFound() }

        // TODO move it to ContentCategoryContentsController.index with pagination and REACT
        contentCategory.getContents({ where: { published: true } }).then(contents => {
          res.render('content_categories/show', { contentCategory, contents })
        }).catch(next)
      }).catch(next)
    } catch (error) {
      next(error)
    }
  }
}

export default ContentCategoriesController
