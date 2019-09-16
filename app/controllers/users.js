import finalhandler from 'finalhandler'
import db from '../models'
import Joi from 'joi'

class UsersController {
  static async index(req, res) {
    let done = finalhandler(req, res)

    try {
      const users = await db.User.findAll()
      res.render('users/index', { users: users })
    } catch (error) {
      done(error)
    }
  }

  // TODO: add info about request to log
  // solve problem with static method permittedParams
  static async new(req, res) {
    res.render('users/new')
  }

  static async show(req, res) {
    let done = finalhandler(req, res)
    const { id } = req.params

    // TODO: doesn't work properly
    if (!Number(id)) { done() }

    try {
      db.User.findByPk(id).then(user => {
        res.render('users/show', { user: user.get() })
      }).catch(error => { done(error) })
    } catch (error) {
      done(error)
    }
  }

  static async create(req, res) {
    let done = finalhandler(req, res)
    const params = req.body

    try {
      db.User.create(params).then(user => {
        res.redirect(`/users/${user.id}`)
      }).catch(error => {
        console.log('error: ', error);
        res.render('users/new', { params: params })
      })
    } catch(error) { done(error) }
  }

  static async update(res, req) {

  }

  static async delete(res, req) {

  }

  // TODO fix undefined static method
  static permittedParams() {
    Joi.object().keys({
      first_name: Joi.string(),
      last_name: Joi.string(),
      email: Joi.string()
    })
  }
}

export default UsersController
