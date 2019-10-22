import { Router } from 'express'

import usersRouter from './users'
import contentCategoriesRouter from './content_categories'
import contentsRouter from './contents'

import UsersController from '../../controllers/admin/users'

const router = Router()

router.use('/users', usersRouter)
router.use('/content-categories', contentCategoriesRouter)
router.use('/contents', contentsRouter)
router.use('/', UsersController.index)

export default router
