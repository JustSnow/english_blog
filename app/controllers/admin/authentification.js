import finalhandler from 'finalhandler'
import db from '../../models'

const passport = require('passport')

class AdminAuthentificationController {
  static async login(req, res, next) {
    res.render('admin/authentification/login')
  }

  // TODO fix problem with success redirect. Evry time it uses general layout 
  static async authenticate(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/admin',
      failureRedirect: '/admin/login',
      failureFlash: true,
      successFlash: `You are now logged in!`
    })(req, res, next)
  }

  // TODO use admin routes helper
  static async logout(req, res, next) {
    req.logOut()
    res.redirect('/admin/login')
  }
}

export default AdminAuthentificationController
