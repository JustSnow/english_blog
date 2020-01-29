import { Router } from 'express'
import ContentCategoriesController from '../../controllers/layout/content_categories'
import ContentCategoryContentsController from '../../controllers/layout/content_category_contents'

const router = Router()

// TODO overwrite to use slug (alias), add regexp
router.get('/:id(\\d+)$', ContentCategoriesController.show)
router.get('/:contentCategoryId(\\d+)/contents', ContentCategoryContentsController.index)
router.get('/:contentCategoryId(\\d+)/contents/:id(\\d+)', ContentCategoryContentsController.show)

export default router
