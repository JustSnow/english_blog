import { Router } from 'express'
import PagesController from '../../controllers/admin/pages'
import ValidateSchema from 'express-validate-schema'

const router = Router()

router.get('/new', PagesController.new)
router.get('/:id(\\d+)/edit', PagesController.edit)

router.route('/')
  .get(PagesController.index)
  .post(ValidateSchema().params(PagesController.permittedParams()), PagesController.create)

router.route('/:id(\\d+)')
  .put(PagesController.update)
  .delete(PagesController.delete)

export default router
