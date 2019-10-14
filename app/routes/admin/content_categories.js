import { Router } from 'express'
import ContentCategoriesController from '../../controllers/admin/content_categories'
import ValidateSchema from 'express-validate-schema'

const router = Router()

router.get('/new', ContentCategoriesController.new)
router.get('/:id(\\d+)/edit', ContentCategoriesController.edit)

router.route('/')
  .get(ContentCategoriesController.index)
  .post(ValidateSchema().params(ContentCategoriesController.permittedParams()), ContentCategoriesController.create)

router.route('/:id(\\d+)')
  .put(ContentCategoriesController.update)
  .delete(ContentCategoriesController.delete)

export default router
