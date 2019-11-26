import { Router } from 'express'
import ContentsController from '../../controllers/admin/contents'
import ValidateSchema from 'express-validate-schema'
import path from 'path'

const router = Router()

// TODO move to upload service
const multer = require('multer')
const sha1 = require('sha1')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/contents/')
  },
  filename: (req, file, cb) => {
    let fileName = sha1(file.fieldname + '-' + Date.now()) + path.extname(file.originalname)
    cb(null, fileName)
  }
})

let upload = multer({ storage })

router.get('/new', ContentsController.new)
router.get('/:id(\\d+)/edit', ContentsController.edit)

router.route('/')
  .get(ContentsController.index)
  .post(ValidateSchema().body(ContentsController.permittedParams()), ContentsController.create)

router.route('/:id(\\d+)')
  .put(upload.single('thumbnail'), ContentsController.update)
  .delete(ContentsController.delete)

export default router
