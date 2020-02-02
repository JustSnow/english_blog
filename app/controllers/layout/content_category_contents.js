import db from '../../models'
import createError from 'http-errors'

class ContentCategoryContentsController {
  static async index(req, res) {

  }

  static async show(req, res) {
    const { contentCategoryAlias, alias } = req.params

    db.contentCategory.findOne({ where: { alias: contentCategoryAlias } }).then(contentCategory => {
      if (contentCategory === null) { throw new createError.NotFound() }

      contentCategory.getContents({ where: { alias } }).then(contents => {
        const content = contents[0]

        if (content === null) { throw new createError.NotFound() }

        res.render('contents/show', { contentCategory, content })
      })
    })
  }
}

export default ContentCategoryContentsController
