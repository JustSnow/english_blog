import path from 'path'

const multer = require('multer')
const sha1 = require('sha1')
const fs = require('fs')

// TODO try to use stright in controller as middleware
// without wrapping in function like:
// Uploader.singleUpload(..., (error) => { all code inside })
class Uploader {
  configureStorage (destination) {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, destination)
      },
      filename: (req, file, cb) => {
        let fileName = sha1(file.fieldname + '-' + Date.now()) + path.extname(file.originalname)
        cb(null, fileName)
      }
    })
  }

  singleUpload (destination, fieldName, options = {}) {
    let storage = this.configureStorage(destination)
    let upload = multer(Object.assign({ storage }, options))

    return upload.single(fieldName)
  }

  listUpload () {

  }

  compareFilePaths (existingPath, newPath) {
    if (existingPath && existingPath != newPath) {
      return this.deleteFile(`public${existingPath}`)
    }
  }

  deleteFile (filePath, callback = () => {}) {
    return fs.unlink(filePath, callback)
  }
}

export default new Uploader
