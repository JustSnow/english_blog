import db from '../../models'
import createError from 'http-errors'

class ContentCategoriesController {
  static async show(req, res, next) {
    const { id } = req.params

    try {
      db.contentCategory.findByPk(id).then(contentCategory => {
        if (contentCategory === null) { throw new createError.NotFound() }

        contentCategory.getContents().then(contents => {
          res.render('content_categories/show', { contentCategory, contents })
        }).catch(next)
      }).catch(next)
    } catch (error) {
      next(error)
    }
  }
}

export default ContentCategoriesController
