import { Router } from 'express'
import UsersController from '../../controllers/admin/users'
import ValidateSchema from 'express-validate-schema'

const router = Router()

router.get('/new', UsersController.new)

router.route('/')
  .get(UsersController.index)
  .post(ValidateSchema().params(UsersController.permittedParams()), UsersController.create)
  .put(UsersController.update)

router.route('/:id(\\d+)')
  .get(UsersController.show)
  .delete(UsersController.delete)

export default router
