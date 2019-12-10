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
import MenuActiveItem from '../../services/menu_active_item'

const froalaConfig = require('../../../config/froala_editor')

$(document).ready(() => {
  $('.l-admin-page-navigation').each((_, element) => {
    let menu = new MenuActiveItem({ element })
    menu.handle()
  })

  $('.b-reach-text-editor').each((index, element) => {
    new FroalaEditor(element, {
      toolbarButtons: froalaConfig.toolbarButtons,
      imageInsertButtons: froalaConfig.imageInsertButtons,
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
