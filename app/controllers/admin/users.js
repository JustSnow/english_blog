import finalhandler from 'finalhandler'
import db from '../../models'
import Joi from 'joi'

class UsersController {
  static async index(req, res) {
    let done = finalhandler(req, res)

    try {
      db.user.findAll().then(users => {
        res.render('admin/users/index', { users: users })
      }).catch(error => { done(error) })
    } catch (error) { done(error) }
  }

  static async new(req, res) {
    res.render('admin/users/new')
  }

  static async show(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    try {
      db.user.findByPk(id).then(user => {
        res.render('admin/users/show', { user: user.get() })
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
        res.redirect(`/admin/users/${user.id}`)
      }).catch(error => {
        console.log('error: ', error);
        res.render('admin/users/new', { params: params })
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
          res.redirect(`/admin/users/${user.id}`)
        }).catch(error => {
          let backURL = req.header('Referer') || `/admin/users/${user.id}`
          console.log('error: ', error);
          res.redirect(backURL)
        })
      })
    } catch(error) { done(error) }
  }

  static async delete(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    try {
      db.user.findByPk(id).then(user => {
        user.destroy({ force: true }).then(user => {
          res.redirect('/admin/users')
        }).catch(error => { done(error) })
      }).catch(error => { done(error) })
    } catch(error) { done(error) }
  }

  static permittedParams() {
    return Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string()
    })
  }
}

export default UsersController
