import finalhandler from 'finalhandler'
import db from '../../models'
import Joi from 'joi'
import AdminRoutes from '../../routes/admin/helper'
import createError from 'http-errors'

// TODO refactor me add dry with General CRUD class
class PagesController {
  static async index(req, res) {
    let done = finalhandler(req, res)

    try {
      db.page.findAll().then(pages => {
        res.render('admin/pages/index', { pages })
      }).catch(error => { done(error) })
    } catch (error) { done(error) }
  }

  static async new(req, res) {
    res.render('admin/pages/new')
  }

  static async edit(req, res, next) {
    let done = finalhandler(req, res)
    const { id } = req.params

    try {
      db.page.findByPk(id).then(page => {
        if (page === null) { throw new createError.NotFound() }

        res.render('admin/pages/edit', { page })
      }).catch(next)
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res) {
    let done = finalhandler(req, res)
    const params = req.body

    try {
      db.page.create(params).then(page => {
        res.redirect(AdminRoutes.editPagePath(page.id))
      }).catch(error => {
        console.log('error: ', error);
        res.render('admin/pages/new', { params })
      })
    } catch(error) { done(error) }
  }

  static async update(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params
    const params = req.body

    try {
      db.page.findByPk(id).then(page => {
        if (page === null) { throw new createError.NotFound() }

        page.update(params).then(page => {
          res.redirect(AdminRoutes.editPagePath(page.id))
        }).catch(error => {
          let backURL = req.header('Referer') || AdminRoutes.editPagePath(page.id)
          console.log('error: ', error);
          res.redirect(backURL)
        })
      }).catch(done)
    } catch(error) { done(error) }
  }

  static async delete(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    try {
      db.page.findByPk(id).then(page => {
        page.destroy({ force: true }).then(page => {
          res.redirect(AdminRoutes.pagesPath())
        }).catch(error => { done(error) })
      }).catch(error => { done(error) })
    } catch(error) { done(error) }
  }

  static permittedParams() {
    return Joi.object().keys({
      title: Joi.string(),
      alias: Joi.string(),
      description: Joi.string()
    })
  }
}

export default PagesController
