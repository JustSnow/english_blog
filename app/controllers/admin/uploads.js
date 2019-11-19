import createError from 'http-errors'

const FroalaEditorSDK = require('wysiwyg-editor-node-sdk/lib/froalaEditor')

class UploadsController {
  saveEditorImage(req, res) {
    FroalaEditorSDK.Image.upload(req, '../public/uploads/editor/', function (error, data) {
      if (error) {
        return res.send(JSON.stringify(error))
      }

      data.link = data.link.replace('../public/', '/')
      return res.send(data)
    })
  }

  deleteEditorImage(req, res) {
    let src = `../public${req.body.src}`
    FroalaEditorSDK.Image.delete(src, (error) => {
      if (error) {
        return res.send(JSON.stringify(error))
      }

      return res.send()
    })
  }
}

export default new UploadsController
