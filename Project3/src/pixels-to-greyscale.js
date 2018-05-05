const Jimp = require('jimp')

/**
 * Takes weighted average of color channels of pixels and makes a pixel greyscale
 * @param {data} data imgSrc for a given Jimp instance
 * @param {*} x x-coordinate of a pixel
 * @param {*} y y-coordinate of a pixel
 * @returns {Object} Object with rgba channels
 */
function RGBtoGrey (data, x, y) {
  let pixel = Jimp.intToRGBA(data.getPixelColor(x, y))
  let grey = Math.floor(pixel.r * 0.2126 + pixel.b * 0.7152 + pixel.g * 0.0722)
  return Jimp.rgbaToInt(grey, grey, grey, 255)
}

module.exports = RGBtoGrey
