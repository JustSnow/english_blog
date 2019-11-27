import { Router } from 'express'
import ContentsController from '../../controllers/admin/contents'
import ValidateSchema from 'express-validate-schema'
import Uploader from '../../services/uploader'

const router = Router()
const thumbsPath = './public/uploads/contents/'

router.get('/new', ContentsController.new)
router.get('/:id(\\d+)/edit', ContentsController.edit)

router.route('/')
  .get(ContentsController.index)
  .post(ValidateSchema().body(ContentsController.permittedParams()), Uploader.singleUpload(thumbsPath, 'thumbnail'), ContentsController.create)

router.route('/:id(\\d+)')
  .put(Uploader.singleUpload(thumbsPath, 'thumbnail'), ContentsController.update)
  .delete(ContentsController.delete)

export default router
