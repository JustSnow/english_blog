import createError from 'http-errors'

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

class ImagesScaler {
  // TODO firstly check either image exist or not
  // if exist return existed one, if no schedule resize and return resized from stream
  resize(imageOptions = {}, callback) {
    if (!imageOptions.path) {
      throw new createError.NotFound()
    }

    const allowedImageOptions = this.filterImageOptions(imageOptions)
    const imagePath = path.join('public', allowedImageOptions.path)
    const readStream = fs.createReadStream(imagePath)

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
}

export default new ImagesScaler
