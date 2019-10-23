import finalhandler from 'finalhandler'
import db from '../../models'

class AdminAuthentificationController {
  static async login(req, res, next) {
    res.render('admin/authentification/login')
  }
}

export default AdminAuthentificationController
