import { Router } from 'express'
import UploadsController from '../../controllers/admin/uploads'

const router = Router()

router.post('/editor-images', UploadsController.editorImages)

export default router
