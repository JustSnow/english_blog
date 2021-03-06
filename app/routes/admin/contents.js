import { Router } from 'express'
import ContentsController from '../../controllers/admin/contents'
import Uploader from '../../services/uploader'

const router = Router()
const thumbsPath = './public/uploads/contents/'

router.get('/new', (...args) => ContentsController.new(...args))
router.get('/:id(\\d+)/edit', (...args) => ContentsController.edit(...args))

router.route('/')
  .get(ContentsController.index)
  .post(Uploader.singleUpload(thumbsPath, 'thumbnail'), ContentsController.permittedParams(), ContentsController.create)

router.route('/:id(\\d+)')
  .put(Uploader.singleUpload(thumbsPath, 'thumbnail'), ContentsController.permittedParams(), ContentsController.update)
  .delete(ContentsController.delete)

export default router
