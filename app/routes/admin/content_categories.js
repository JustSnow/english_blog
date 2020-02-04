import { Router } from 'express'
import ContentCategoriesController from '../../controllers/admin/content_categories'
import Uploader from '../../services/uploader'

const router = Router()
const thumbsPath = './public/uploads/content-categories/'

router.get('/new', ContentCategoriesController.new)
router.get('/:id(\\d+)/edit', ContentCategoriesController.edit)

router.route('/')
  .get(ContentCategoriesController.index)
  .post(Uploader.singleUpload(thumbsPath, 'thumbnail'), ContentCategoriesController.permittedParams(), ContentCategoriesController.create)

router.route('/:id(\\d+)')
  .put(Uploader.singleUpload(thumbsPath, 'thumbnail'), ContentCategoriesController.permittedParams(), ContentCategoriesController.update)
  .delete(ContentCategoriesController.delete)

export default router
