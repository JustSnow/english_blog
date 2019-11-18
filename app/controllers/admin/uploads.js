import createError from 'http-errors'

const FroalaEditorSDK = require('wysiwyg-editor-node-sdk/lib/froalaEditor')

class UploadsController {
  async editorImages(req, res) {
    FroalaEditorSDK.Image.upload(req, '/public/uploads/editor/', (err, data) => {
      if (err) {
        return res.send(JSON.stringify(err))
      }

      return res.send(data)
    })
  }
}

export default new UploadsController
