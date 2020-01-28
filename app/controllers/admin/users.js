import db from '../../models'
import Joi from 'joi'
import AdminRoutes from '../../routes/admin/helper'
import createError from 'http-errors'

// TODO fix problem with wrong id or if user doesn't exist in db (handle error for this)
class UsersController {
  async index(req, res, next) {
    try {
      db.user.findAll({ order: [['id', 'DESC']] }).then(users => {
        res.render('admin/users/index', { users })
      }).catch(next)
    } catch (error) { next(error) }
  }

  async new(req, res) {
    let roleValues = db.user.roleValues()
    res.render('admin/users/new', { roleValues, params: {} })
  }

  async edit(req, res, next) {
    const { id } = req.params

    try {
      db.user.findByPk(id).then(user => {
        if (user === null) { throw new createError.NotFound() }

        let roleValues = db.user.roleValues()
        res.render('admin/users/edit', { user, roleValues })
      }).catch(next)
    } catch(error) {
      next(error)
    }
  }

  async create(req, res, next) {
    let roleValues = db.user.roleValues()
    const params = req.body

    try {
      db.user.create(params).then(user => {
        res.redirect(AdminRoutes.editUserPath(user.id))
      }).catch(error => {
        req.flash('error', error)
        res.render('admin/users/new', { roleValues, params })
      })
    } catch(error) { next(error) }
  }

  async update(req, res, next) {
    const { id } = req.params
    const params = req.body

    try {
      db.user.findByPk(id).then(user => {
        if (user === null) { throw new createError.NotFound() }

        user.update(params).then(user => {
          res.redirect(AdminRoutes.editUserPath(user.id))
        }).catch(error => {
          let backURL = req.header('Referer') || AdminRoutes.editUserPath(user.id)
          delete params.encryptedPassword
          req.flash('error', error)
          res.redirect(backURL)
        })
      }).catch(next)
    } catch(error) { next(error) }
  }

  async delete(req, res, next) {
    const { id } = req.params

    try {
      db.user.findByPk(id).then(user => {
        user.destroy({ force: true }).then(user => {
          res.redirect(AdminRoutes.usersPath())
        }).catch(next)
      }).catch(next)
    } catch(error) { next(error) }
  }

  permittedParams() {
    return Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string(),
      role: Joi.string(),
      password: Joi.string(),
      passwordConfirmation: Joi.string(),
    })
  }
}

export default new UsersController
