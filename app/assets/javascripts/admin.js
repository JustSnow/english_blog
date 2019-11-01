require('../stylesheets/admin.sass')

require('bootstrap/js/src/util')
require('bootstrap/js/src/tools/sanitizer')

require('bootstrap/js/src/tooltip')
require('bootstrap/js/src/collapse')
require('bootstrap/js/src/tab')
require('bootstrap/js/src/modal')
require('bootstrap/js/src/dropdown')
require('bootstrap/js/src/button')

import FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min'
// TODO: handle image uploading to server
// https://www.froala.com/wysiwyg-editor/docs/concepts/image/upload
const reachEditor = new FroalaEditor('.b-reach-text-editor')
