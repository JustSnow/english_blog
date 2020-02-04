import db from '../../models'
import AdminRoutes from '../../routes/admin/helper'
import createError from 'http-errors'
import Uploader from '../../services/uploader'

const { checkSchema } = require('express-validator')

// TODO refactor me add dry with General CRUD class
class ContentCategoriesController {
  async index(req, res, next) {
    try {
      db.contentCategory.findAll({ order: [['id', 'DESC']] }).then(contentCategories => {
        res.render('admin/content_categories/index', { contentCategories })
      }).catch(next)
    } catch (error) { next(error) }
  }

  async new(req, res) {
    res.render('admin/content_categories/new', { params: {} })
  }

  async edit(req, res, next) {
    const { id } = req.params

    try {
      db.contentCategory.findByPk(id).then(contentCategory => {
        if (contentCategory === null) { throw new createError.NotFound() }

        res.render('admin/content_categories/edit', { contentCategory })
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

      db.contentCategory.create(params).then(contentCategory => {
        res.redirect(AdminRoutes.editContentCategoryPath(contentCategory.id))
      }).catch(error => {
        req.flash('error', error.errors)
        res.render('admin/content_categories/new', { params })
      })
    } catch(error) { next(error) }
  }

  // TODO investingate how provide further in edit values form fields when validation failed
  // TODO store current user
  async update(req, res, next) {
    const { id } = req.params
    const params = req.body

    try {
      db.contentCategory.findByPk(id).then(contentCategory => {
        if (contentCategory === null) { throw new createError.NotFound() }

        if (req.file) {
          let thumbnailPath = req.file.path.replace('public', '')
          Uploader.compareFilePaths(contentCategory.thumbnailPath, thumbnailPath)

          params.thumbnailPath = thumbnailPath
        }

        contentCategory.update(params).then(contentCategory => {
          res.redirect(AdminRoutes.editContentCategoryPath(contentCategory.id))
        }).catch(error => {
          let backURL = req.header('Referer') || AdminRoutes.editContentCategoryPath(contentCategory.id)
          req.flash('error', error.errors)
          res.redirect(backURL)
        })
      }).catch(next)
    } catch(error) { next(error) }
  }

  async delete(req, res, next) {
    const { id } = req.params

    try {
      db.contentCategory.findByPk(id).then(contentCategory => {
        contentCategory.destroy({ force: true }).then(contentCategory => {
          res.redirect(AdminRoutes.contentCategoriesPath())
        }).catch(next)
      }).catch(next)
    } catch(error) { next(error) }
  }

  permittedParams() {
    return checkSchema({
      title: {
        isEmpty: false,
        errorMessage: 'test'
      },
      published: {
        toBoolean: true
      },
      featured: {
        toBoolean: true
      }
    })
  }
}

export default new ContentCategoriesController
