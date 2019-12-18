import createError from 'http-errors'

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const safeImageOptions = require(path.relative(__dirname, 'config/allowed_image_options'))

class ImagesScaler {
  // TODO firstly check either image exist or not
  // if exist return existed one, if no schedule resize and return resized from stream
  resize(imageOptions = {}, callback) {
    const allowedImageOptions = this.filterImageOptions(imageOptions)
    const imagePath = path.join('public', allowedImageOptions.path)
    const readStream = fs.createReadStream(imagePath)

    if (!imageOptions.path) { this.throwError() }
    // if (!this.isAllowedImageStore(imagePath)) { this.throwError() }

    readStream.on('error', callback)

    let transform = sharp()
    let format = allowedImageOptions.format
    let width, height

    if (allowedImageOptions.width) {
      width = parseInt(allowedImageOptions.width)
    }

    if (allowedImageOptions.height) {
      height = parseInt(allowedImageOptions.height)
    }

    if (format) {
      transform = transform.toFormat(format)
    }

    if (width || height) {
      transform = transform.resize(width, height)
      // debugger
      // if (this.isAllowedWidth(width) && this.isAllowedHeight(height)) {
      //   debugger
      //   transform = transform.resize(width, height)
      // } else {
      //   this.throwError()
      // }
    }

    return readStream.pipe(transform)
  }

  allowedOptions() {
    return ['width', 'height', 'path', 'format']
  }

  filterImageOptions(imageOptions = {}) {
    let allowedImageOptions = {}

    this.allowedOptions().forEach(option => {
      if (imageOptions[option]) {
        Object.assign(allowedImageOptions, { [option]: imageOptions[option] })
      }
    })

    return allowedImageOptions
  }

  isAllowedImageStore(path) {
    let allowed = false

    safeImageOptions.possibleImageStores.forEach(storage => {
      if (path.includes(storage)) {
        this.saveImageConfigBranchName(storage)
        allowed = true
      }
    })

    return allowed
  }

  isAllowedWidth(width) {
    let allowed = false

    safeImageOptions[storageName].widths.forEach(allowedWidth => {
      if (allowedWidth == width) {
        allowed = true
      }
    })

    return allowed
  }

  isAllowedHeight(height) {
    let allowed = false

    safeImageOptions[storageName].heights.forEach(allowedHeight => {
      if (allowedWidth == height) {
        allowed = true
      }
    })

    return allowed
  }

  throwError() {
    throw new createError.NotFound()
  }

  saveImageConfigBranchName(storage) {
    debugger
    // TODO use here class property
    switch (storage) {
      case 'contents':
        storageName = 'content'
      case 'content-categories':
        storageName = 'contentCategory'
      default:
        throwError()
    }
  }
}

export default new ImagesScaler
