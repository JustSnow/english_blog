import { Router } from 'express'
import UsersController from '../controllers/users'

const router = Router()

router.get('/new', UsersController.new)

router.route('/')
  .get(UsersController.index)
  .post(UsersController.create)
  .put(UsersController.update)

router.route('/:id(\\d+)')
  .get(UsersController.show)
  .delete(UsersController.delete)

export default router
