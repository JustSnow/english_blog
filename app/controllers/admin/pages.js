import db from '../../models'
import AdminRoutes from '../../routes/admin/helper'
import createError from 'http-errors'

// TODO refactor me add dry with General CRUD class
class PagesController {
  async index(req, res, next) {
    try {
      db.page.findAll({ order: [['id', 'DESC']] }).then(pages => {
        res.render('admin/pages/index', { pages })
      }).catch(next)
    } catch (error) { next(error) }
  }

  async new(req, res) {
    res.render('admin/pages/new', { params: {} })
  }

  async edit(req, res, next) {
    const { id } = req.params

    try {
      db.page.findByPk(id).then(page => {
        if (page === null) { throw new createError.NotFound() }

        res.render('admin/pages/edit', { page })
      }).catch(next)
    } catch (error) { next(error) }
  }

  // TODO store current user
  async create(req, res, next) {
    const params = req.body

    try {
      db.page.create(params).then(page => {
        res.redirect(AdminRoutes.editPagePath(page.id))
      }).catch(error => {
        req.flash('error', error.errors)
        res.render('admin/pages/new', { params })
      })
    } catch(error) { next(error) }
  }

  // TODO investingate how provide further in edit values form fields when validation failed
  // TODO store current user
  async update(req, res, next) {
    const { id } = req.params
    const params = req.body

    try {
      db.page.findByPk(id).then(page => {
        if (page === null) { throw new createError.NotFound() }

        page.update(params).then(page => {
          res.redirect(AdminRoutes.editPagePath(page.id))
        }).catch(error => {
          let backURL = req.header('Referer') || AdminRoutes.editPagePath(page.id)
          req.flash('error', error.errors)
          res.redirect(backURL)
        })
      }).catch(next)
    } catch(error) { next(error) }
  }

  async delete(req, res, next) {
    const { id } = req.params

    try {
      db.page.findByPk(id).then(page => {
        page.destroy({ force: true }).then(page => {
          res.redirect(AdminRoutes.pagesPath())
        }).catch(next)
      }).catch(next)
    } catch(error) { next(error) }
  }

  permittedParams() {
  }
}

export default new PagesController
