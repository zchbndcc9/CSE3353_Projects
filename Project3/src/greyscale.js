const RGBtoGrey = require('./pixels-to-greyscale')
const Jimp = require('jimp')

/**
 * Transform image to greyscale. Greyscaling works by taking a weighted average
 * of each channel of the pixel (excluding the alpha value). Once the weighted
 * average has been calculated. Each channel of the same pixel is set to the
 * calculated average.
 * @param {string} imgName Source file of image
 * @param {string} [newImg = imgName] Destination file for the new greyscale
  image. If undefined, the original image will be overwritten
 */
function greyscale (imgName, newImg = imgName) {
  Jimp.read(imgName).then(imgSrc => {
    imgSrc.scan(0, 0, imgSrc.bitmap.width, imgSrc.bitmap.height, (x, y, idx) => {
      imgSrc.setPixelColor(RGBtoGrey(imgSrc, x, y), x, y)
    }).write(newImg)
  }).catch((err) => {
    console.log(err)
  })
}

module.exports = greyscale
