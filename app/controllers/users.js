import finalhandler from 'finalhandler'
import db from '../models'

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

  static async show(req, res) {

  }

  static async create(req, res) {

  }
}

export default UsersController
