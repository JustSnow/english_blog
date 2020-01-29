import db from '../../models'
import createError from 'http-errors'

const passport = require('passport')

class AdminAuthentificationController {
  async login(req, res, next) {
    res.render('admin/authentification/login')
  }

  async authenticate(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/admin',
      failureRedirect: '/admin/login',
      failureFlash: true,
      successFlash: `You are now logged in!`
    })(req, res, next)
  }

  // TODO use admin routes helper
  async logout(req, res, next) {
    req.logOut()
    res.redirect('/admin/login')
  }

  isAuthentificated(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      throw new createError.Unauthorized()
    }
  }
}

export default new AdminAuthentificationController
