import { Router } from 'express'
import UsersController from '../../controllers/admin/users'
// TODO try to use https://express-validator.github.io
import ValidateSchema from 'express-validate-schema'

const router = Router()

router.get('/new', UsersController.new)
router.get('/:id(\\d+)/edit', UsersController.edit)

router.route('/')
  .get(UsersController.index)
  .post(UsersController.create)

router.route('/:id(\\d+)')
  .put(UsersController.update)
  .delete(UsersController.delete)

export default router
