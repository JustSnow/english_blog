import { Router } from 'express'

import usersRouter from './users'
import contentCategoriesRouter from './content_categories'
import contentsRouter from './contents'

import UsersController from '../../controllers/admin/users'
import AdminAuthentificationController from '../../controllers/admin/authentification'

const router = Router()

// TODO move into separate router like usersRouter
router.get('/login', AdminAuthentificationController.login)
router.post('/login', AdminAuthentificationController.authenticate)
router.delete('/logout', AdminAuthentificationController.logout)

router.use('/users', usersRouter)
router.use('/content-categories', contentCategoriesRouter)
router.use('/contents', contentsRouter)
router.use('/', UsersController.index)

export default router
