import createError from 'http-errors'

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const safeImageOptions = require(path.relative(__dirname, 'config/allowed_image_options'))

class ImagesScaler {
  // TODO firstly check either image exist or not
  // if exist return existed one, if no schedule resize and return resized from stream
  // Change image's sizes to versions, just provide path and version like (path, 'contents/show_page')
  resize(imageOptions = {}, callback) {
    const allowedImageOptions = this.filterImageOptions(imageOptions)
    const imagePath = path.join('public', allowedImageOptions.path)
    const readStream = fs.createReadStream(imagePath)

    if (!imageOptions.path) { this.throwError() }

    let storage = safeImageOptions.possibleImageStores.find(storage => imagePath.includes(storage))

    if (Object.is(storage, undefined)) { this.throwError() }

    let storageName = this.getImageConfigBranchName(storage)

    readStream.on('error', callback)

    let transform = sharp()
    let format = allowedImageOptions.format
    let width, height

    if (allowedImageOptions.width) {
      width = this.findAllowedWidth(parseInt(allowedImageOptions.width), storageName)
    }

    if (allowedImageOptions.height) {
      height = this.findAllowedHeight(parseInt(allowedImageOptions.height), storageName)
    }

    if (format) {
      transform = transform.toFormat(format)
    }

    if (width || height) {
      transform = transform.resize(width, height)
    } else {
      this.throwError()
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

  findAllowedWidth(width, storageName) {
    return safeImageOptions[storageName].widths.find(allowedWidth => allowedWidth == width)
  }

  findAllowedHeight(height, storageName) {
    return safeImageOptions[storageName].heights.find(allowedHeight => allowedHeight == height)
  }

  throwError() {
    throw new createError.NotFound()
  }

  getImageConfigBranchName(storage) {
    switch (storage) {
      case 'contents':
        return 'content'
      case 'content-categories':
        return 'contentCategory'
      default:
        return this.throwError()
    }
  }
}

export default new ImagesScaler
