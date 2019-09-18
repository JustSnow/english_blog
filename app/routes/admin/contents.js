import { Router } from 'express'
import ContentsController from '../../controllers/admin/contents'
import ValidateSchema from 'express-validate-schema'

const router = Router()

router.get('/new', ContentsController.new)

router.route('/')
  .get(ContentsController.index)
  .post(ValidateSchema().params(ContentsController.permittedParams()), ContentsController.create)
  .put(ContentsController.update)

router.route('/:id(\\d+)')
  .get(ContentsController.show)
  .delete(ContentsController.delete)

export default router
