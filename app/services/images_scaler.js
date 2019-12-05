const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

class ImagesScaler {
  // TODO firstly check either image exist or not
  // if exist return existed one, if no schedule resize and return resized from stream
  // add white list of dimensions - width, height
  resize(imageOptions = {}) {
    let imagePath = path.join('public', imageOptions.path)
    const readStream = fs.createReadStream(imagePath)
    let transform = sharp()
    let format = imageOptions.format
    let width, height

    if (imageOptions.width) {
      width = parseInt(imageOptions.width)
    }

    if (imageOptions.height) {
      height = parseInt(imageOptions.height)
    }

    if (format) {
      transform = transform.toFormat(format)
    }

    if (width || height) {
      transform = transform.resize(width, height)
    }

    return readStream.pipe(transform)
  }
}

export default new ImagesScaler
