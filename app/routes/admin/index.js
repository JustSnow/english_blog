import { Router } from 'express'

import usersRouter from './users'
import contentCategoriesRouter from './content_categories'
import contentsRouter from './contents'

const router = Router()

router.use('/users', usersRouter)
router.use('/content-categories', contentCategoriesRouter)
router.use('/contents', contentsRouter)

export default router
