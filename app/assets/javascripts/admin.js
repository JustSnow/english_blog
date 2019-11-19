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
import 'froala-editor/js/plugins/image.min'

$(document).ready(() => {
  $('.b-reach-text-editor').each((index, element) => {
    new FroalaEditor(element, {
      toolbarButtons: {
        'moreText': {
          'buttons': [
            'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript',
            'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass',
            'inlineStyle', 'clearFormatting'
          ]
        },
        'moreParagraph': {
          'buttons': [
            'alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight',
            'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat',
            'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'
          ]
        },
        'moreRich': {
          'buttons': [
            'insertLink', 'insertImage', 'insertTable'
          ]
        },
        'moreMisc': {
          'buttons': [
            'undo', 'redo', 'fullscreen', 'html'
          ],
          'alight': 'right',
          'buttonsVisible': 4
        }
      },
      imageInsertButtons: ['imageBack', '|', 'imageUpload'],
      imageUploadURL: '/admin/uploads/editor-image',
      events: {
        'image.removed': (image) => {
          let xhttp = new XMLHttpRequest()
          xhttp.open('DELETE', '/admin/uploads/editor-image')
          xhttp.setRequestHeader('Content-Type', 'application/json')
          xhttp.send(JSON.stringify({
            src: image.attr('src')
          }))
        }
      }
    })
  })
})
