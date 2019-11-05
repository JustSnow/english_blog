import finalhandler from 'finalhandler'
import db from '../../models'
import Joi from 'joi'
import AdminRoutes from '../../routes/admin/helper'
import createError from 'http-errors'

// TODO fix problem with wrong id or if user doesn't exist in db (handle error for this)
class UsersController {
  static async index(req, res) {
    let done = finalhandler(req, res)

    try {
      db.user.findAll().then(users => {
        res.render('admin/users/index', { users })
      }).catch(error => { done(error) })
    } catch (error) { done(error) }
  }

  static async new(req, res) {
    let roleValues = db.user.roleValues()
    res.render('admin/users/new', { roleValues })
  }

  static async edit(req, res, next) {
    let done = finalhandler(req, res)
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

  static async create(req, res) {
    let done = finalhandler(req, res)
    const params = await UsersController._generateHashedPassword(req.body)

    try {
      db.user.create(params).then(user => {
        res.redirect(AdminRoutes.editUserPath(user.id))
      }).catch(error => {
        delete params.encryptedPassword
        req.flash('error', error)
        res.render('admin/users/new', { params })
      })
    } catch(error) { done(error) }
  }

  static async update(req, res, next) {
    let done = finalhandler(req, res)
    const { id } = req.params
    const params = await UsersController._generateHashedPassword(req.body)

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

  static async delete(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    try {
      db.user.findByPk(id).then(user => {
        user.destroy({ force: true }).then(user => {
          res.redirect(AdminRoutes.usersPath())
        }).catch(error => { done(error) })
      }).catch(error => { done(error) })
    } catch(error) { done(error) }
  }

  static permittedParams() {
    return Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string(),
      role: Joi.string(),
      password: Joi.string(),
      passwordConfirmation: Joi.string(),
    })
  }

  static async _generateHashedPassword(params) {
    if (params.passwordConfirmation && params.password == params.passwordConfirmation) {
      params.encryptedPassword = await db.user.generateHashedPassword(params.password)
    }

    return params
  }
}

export default UsersController
