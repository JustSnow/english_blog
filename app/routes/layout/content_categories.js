import { Router } from 'express'
import ContentCategoriesController from '../../controllers/layout/content_categories'
import ContentCategoryContentsController from '../../controllers/layout/content_category_contents'

const router = Router()

router.get('/:alias(\[a-zA-Z]*|\-*|\S|\d*)$', ContentCategoriesController.show)
router.get('/:alias(\[a-zA-Z]*|\-*|\S|\d*)/contents', ContentCategoryContentsController.index)

export default router
