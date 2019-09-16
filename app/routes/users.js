import { Router } from 'express'
import UsersController from '../controllers/users'
import ValidateSchema from 'express-validate-schema'
import Joi from 'joi'

const router = Router()
const permittedParams = Joi.object()
  .keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string()
  })

router.get('/new', UsersController.new)

router.route('/')
  .get(UsersController.index)
  .post(ValidateSchema().params(permittedParams), UsersController.create)
  .put(UsersController.update)

router.route('/:id(\\d+)')
  .get(UsersController.show)
  .delete(UsersController.delete)

export default router
