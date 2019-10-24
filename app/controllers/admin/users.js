import finalhandler from 'finalhandler'
import db from '../../models'
import Joi from 'joi'
import AdminRoutes from '../../routes/admin/helper'

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

  static async edit(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    try {
      db.user.findByPk(id).then(user => {
        let roleValues = db.user.roleValues()
        res.render('admin/users/edit', { user, roleValues })
      }).catch(error => { done(error) })
    } catch (error) {
      done(error)
    }
  }

  static async create(req, res) {
    let done = finalhandler(req, res)
    const params = req.body

    try {
      db.user.create(params).then(user => {
        res.redirect(AdminRoutes.editUserPath(user.id))
      }).catch(error => {
        console.log('error: ', error);
        res.render('admin/users/new', { params })
      })
    } catch(error) { done(error) }
  }

  static async update(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params
    const params = req.body

    try {
      db.user.findByPk(id).then(user => {
        user.update(params).then(user => {
          res.redirect(AdminRoutes.editUserPath(user.id))
        }).catch(error => {
          let backURL = req.header('Referer') || AdminRoutes.editUserPath(user.id)
          console.log('error: ', error);
          res.redirect(backURL)
        })
      }).catch(error => { done(error) })
    } catch(error) { done(error) }
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
      role: Joi.string()
    })
  }
}

export default UsersController
