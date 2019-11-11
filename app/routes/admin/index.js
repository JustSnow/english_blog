import { Router } from 'express'

import usersRouter from './users'
import contentCategoriesRouter from './content_categories'
import contentsRouter from './contents'
import pagesRouter from './pages'

import UsersController from '../../controllers/admin/users'
import AdminAuthentificationController from '../../controllers/admin/authentification'

const router = Router()

router.route('/login')
  .get(AdminAuthentificationController.login)
  .post(AdminAuthentificationController.authenticate)
router.delete('/logout', AdminAuthentificationController.logout)

router.use('/users', AdminAuthentificationController.isAuthentificated, usersRouter)
router.use('/content-categories', AdminAuthentificationController.isAuthentificated, contentCategoriesRouter)
router.use('/contents', AdminAuthentificationController.isAuthentificated, contentsRouter)
router.use('/pages', AdminAuthentificationController.isAuthentificated, pagesRouter)
router.use('\/$', AdminAuthentificationController.isAuthentificated, UsersController.index)

export default router
