import { Router } from 'express'
import UsersController from '../controllers/users'

const router = Router()

/* GET users listing. */
router.get('/', UsersController.index)

export default router
