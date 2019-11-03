import { Router } from 'express'
import ContentsController from '../../controllers/admin/contents'
import ValidateSchema from 'express-validate-schema'

const router = Router()

router.get('/new', ContentsController.new)
router.get('/:id(\\d+)/edit', ContentsController.edit)

router.route('/')
  .get(ContentsController.index)
  .post(ValidateSchema().body(ContentsController.permittedParams()), ContentsController.create)

router.route('/:id(\\d+)')
  .put(ContentsController.update)
  .delete(ContentsController.delete)

export default router
