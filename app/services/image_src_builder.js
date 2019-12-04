const imagesRoutePath = '/scale/images'

export default function imageSrcBuilder(imageOptions = {}) {
  let encodedOptions = Buffer.from(JSON.stringify(imageOptions)).toString('base64')

  return `${imagesRoutePath}?options=${encodedOptions}`
}
