import '../stylesheets/app.sass'

import 'bootstrap/js/src/collapse'
import 'bootstrap/js/src/dropdown'
import 'bootstrap/js/src/carousel'

import 'bootstrap/js/src/util'

import MenuActiveItem from '../../services/menu_active_item'

$(document).ready(() => {
  $('#b-page-navigation').each((_, element) => {
    let menu = new MenuActiveItem({ element })
    menu.handle()
  })
  $('#l-content-categories-slider').carousel()
})
