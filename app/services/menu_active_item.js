class MenuActiveItem {
  constructor({ element }) {
    this.element = element
  }

  handle() {
    const currentPath = window.location.pathname

    $(this.element).find('.nav-item').each((_, child) => {
      let childPath = $(child).data('path')

      $(child).toggleClass('active', currentPath.includes(childPath))

      if ($(child).hasClass('dropdown')) {
        $(child).find('.dropdown-item').each((_, item) => {
          $(item).toggleClass('active', currentPath.includes($(item).attr('href')))
        })
      }
    })
  }
}

export default MenuActiveItem
