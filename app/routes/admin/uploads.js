import { Router } from 'express'
import UploadsController from '../../controllers/admin/uploads'

const router = Router()

router.post('/editor-image', UploadsController.saveEditorImage)
router.delete('/editor-image', UploadsController.deleteEditorImage)

export default router
