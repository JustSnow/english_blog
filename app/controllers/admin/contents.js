import db from '../../models'
import AdminRoutes from '../../routes/admin/helper'
import createError from 'http-errors'
import Uploader from '../../services/uploader'

// TODO refactor me add dry with General CRUD class
class ContentsController {
  async index(req, res, next) {
    try {
      db.content.findAll({ order: [['id', 'DESC']] }).then(contents => {
        res.render('admin/contents/index', { contents })
      }).catch(next)
    } catch (error) { next(error) }
  }

  async new(req, res, next) {
    let contentCategories = this._getContentCategories()

    contentCategories.then(contentCategories => {
      res.render('admin/contents/new', { contentCategories, params: {} })
    }).catch(next)
  }

  async edit(req, res, next) {
    const { id } = req.params

    try {
      let content = db.content.findByPk(id)
      let contentCategories = this._getContentCategories()

      Promise.all([
        content,
        contentCategories
      ]).then(responses => {
        if (responses[0] === null) { throw new createError.NotFound() }

        res.render('admin/contents/edit', { content: responses[0].get(), contentCategories: responses[1] })
      }).catch(next)
    } catch (error) {
      next(error)
    }
  }

  // TODO store current user
  async create(req, res, next) {
    const params = req.body

    try {
      if (req.file) {
        let thumbnailPath = req.file.path.replace('public', '')
        params.thumbnailPath = thumbnailPath
      }

      db.content.create(params).then(content => {
        res.redirect(AdminRoutes.editContentPath(content.id))
      }).catch(error => {
        req.flash('error', error.errors)
        res.render('admin/contents/new', { params })
      })
    } catch(error) { next(error) }
  }

  // TODO investingate how provide further in edit values form fields when validation failed
  // TODO store current user
  async update(req, res, next) {
    const { id } = req.params
    const params = req.body

    try {
      db.content.findByPk(id).then(content => {
        if (content === null) { throw new createError.NotFound() }

        if (req.file) {
          let thumbnailPath = req.file.path.replace('public', '')
          Uploader.compareFilePaths(content.thumbnailPath, thumbnailPath)

          params.thumbnailPath = thumbnailPath
        }

        content.update(params).then(content => {
          res.redirect(AdminRoutes.editContentPath(content.id))
        }).catch(error => {
          let backURL = req.header('Referer') || AdminRoutes.editContentPath(content.id)
          req.flash('error', error.errors)
          res.redirect(backURL)
        })
      }).catch(next)
    } catch(error) { next(error) }
  }

  async delete(req, res, next) {
    const { id } = req.params

    try {
      db.content.findByPk(id).then(content => {
        content.destroy({ force: true }).then(content => {
          res.redirect(AdminRoutes.contentsPath())
        }).catch(next)
      }).catch(next)
    } catch(error) { next(error) }
  }

  // TODO: be sure contentCategoryId was passed with params
  // required() breaks all
  permittedParams() {
  }

  _getContentCategories(fields = ['id', 'title']) {
    return db.contentCategory.findAll({ attributes:  fields})
  }
}

export default new ContentsController
