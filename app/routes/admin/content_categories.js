import { Router } from 'express'
import ContentCategoriesController from '../../controllers/admin/content_categories'
import ValidateSchema from 'express-validate-schema'

const router = Router()

router.get('/new', ContentCategoriesController.new)

router.route('/')
  .get(ContentCategoriesController.index)
  .post(ValidateSchema().params(ContentCategoriesController.permittedParams()), ContentCategoriesController.create)
  .put(ContentCategoriesController.update)

router.route('/:id(\\d+)')
  .get(ContentCategoriesController.show)
  .delete(ContentCategoriesController.delete)

export default router
