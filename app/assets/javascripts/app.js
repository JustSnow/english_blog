import '../stylesheets/app.sass'

import 'bootstrap/js/src/collapse'
import 'bootstrap/js/src/dropdown'
import 'bootstrap/js/src/carousel'

import 'bootstrap/js/src/util'

$(document).ready(() => {
  console.log('car');
  // TODO require bootstrap in corect way
  // now it doesn't work at all
  $('#l-content-categories-slider').carousel()
})
