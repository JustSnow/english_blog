import { Router } from 'express'
import UsersController from '../../controllers/admin/users'
import ValidateSchema from 'express-validate-schema'

const router = Router()

router.get('/new', UsersController.new)
router.get('/:id(\\d+)/edit', UsersController.edit)

router.route('/')
  .get(UsersController.index)
  .post(ValidateSchema().params(UsersController.permittedParams()), UsersController.create)

router.route('/:id(\\d+)')
  .put(UsersController.update)
  .delete(UsersController.delete)

export default router
