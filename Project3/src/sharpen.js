const Jimp = require('jimp')
/**
 * Sharpens an image by increasing the weighted value of a given pixel relative
 * to its neighbors by utilizing a sharpening kernel
 * @param {string} imgName Source file of image
 * @param {*} [weight = 5] Weight value to be given to a pixel of interest relative to surrounding pixels.
 * If no value is provided, the default weight will be 5
 * @param {*} [newImg = imgName] Destination file for the new greyscale
 * image. If undefined, the original image will be overwritten
 */
function sharpen (imgName, weight = 5, newImg = imgName) {
  const weights = getKernel(weight)
  Jimp.read(imgName).then(imgSrc => {
    let newSrc = imgSrc.clone()
    const width = imgSrc.bitmap.width
    const height = imgSrc.bitmap.height
    imgSrc.scan(1, 1, width, height, function (x, y, idx) {
      let sum = { r: 0, g: 0, b: 0, a: 255 }
      let pixel = {}
      // Calculate sum of neibhoring pixel with the corresponding weight in the kernel
      // relative to the pixel of interest
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          // Guards edge cases
          if (x + i < 0 || x + i > width) continue
          if (y + j < 0 || y + j > height) continue

          pixel = Jimp.intToRGBA(imgSrc.getPixelColor(x + i, y + j))

          sum.r += Math.floor(pixel.r * weights[i + 1][j + 1])
          sum.g += Math.floor(pixel.g * weights[i + 1][j + 1])
          sum.b += Math.floor(pixel.b * weights[i + 1][j + 1])
        }
      }
      if (sum.r < 0 || sum.r > 255) sum.r = sum.r < 0 ? 0 : 255
      if (sum.g < 0 || sum.g > 255) sum.g = sum.g < 0 ? 0 : 255
      if (sum.b < 0 || sum.b > 255) sum.b = sum.b < 0 ? 0 : 255
      newSrc.setPixelColor(Jimp.rgbaToInt(sum.r, sum.g, sum.b, sum.a), x, y)
    })
    newSrc.write(newImg)
  }).catch(err => {
    console.log(err)
  })
}

// Returns sharpening kernel for a given weight
function getKernel (weight) {
  const out = -((weight - 1) / 8)
  return [[out, out, out], [out, weight, out], [out, out, out]]
}

module.exports = sharpen
