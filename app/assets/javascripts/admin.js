require('../stylesheets/admin.sass')

import 'bootstrap/js/src/util'
import 'bootstrap/js/src/tools/sanitizer'

import 'bootstrap/js/src/tooltip'
import 'bootstrap/js/src/collapse'
import 'bootstrap/js/src/tab'
import 'bootstrap/js/src/modal'
import 'bootstrap/js/src/dropdown'
import 'bootstrap/js/src/button'

import FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min'

$(document).ready(() => {
  $('.b-reach-text-editor').each((index, element) => {
    // TODO: handle image uploading to server
    // https://www.froala.com/wysiwyg-editor/docs/concepts/image/upload
    new FroalaEditor(element, {
      imageUploadParam: 'image',
      imageUploadURL: '/admin/uploads/editor-images',
      imageUploadMethod: 'POST'
    })
  })
})
