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

router.use('/users', usersRouter)
router.use('/content-categories', contentCategoriesRouter)
router.use('/contents', contentsRouter)
router.use('/pages', pagesRouter)
router.use('\/$', UsersController.index)

export default router
