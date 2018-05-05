const Jimp = require('jimp')

/**
 * Blur an image with the optional parameter of a blur radius. The resulting
 * blur for a given pixel is the average channel values of all surrounding pixels
 * up to a certain radius
 * @param {string} imgName Source file of image
 * @param {number} [radius = 2] Radius of the blur. If undefined, the default
 * radius of the blur is 2 pixels
 * @param {string} [newImg = imgName] Destination file for the new
 * image. If undefined, the original image will be overwritten
*/
function blur (imgName, radius = 2, newImg = imgName) {
  Jimp.read(imgName).then(imgSrc => {
    const width = imgSrc.bitmap.width
    const height = imgSrc.bitmap.height
    imgSrc.scan(0, 0, width, height, (x, y, idx) => {
      if (x === width - 1 && y === height - 1) {
        // Obtain pixel channel values to the left/right of pixel(x,y)
        blurAxis(imgSrc, radius, x, y, (_x, _y, i) => {
          return Jimp.intToRGBA(imgSrc.getPixelColor(_x + i, _y))
        })
        // Obtain pixel channel values above/below pixel(x,y)
        blurAxis(imgSrc, radius, x, y, (_x, _y, i) => {
          return Jimp.intToRGBA(imgSrc.getPixelColor(_x, _y + i))
        })
      }
    }).write(newImg)
  }).catch(err => {
    console.log(err)
  })
}

/**
 * Blur an image in a certain direction (Vertical or horizontal)
 * @param {data} data imgSrc file of the Jimp instance
 * @param {number} radius Distance away from the pixel that the resulting
 * channels of the destination pixel will be affected by
 * @param {number} x Width of the image
 * @param {number} y Height of the image
 * @param {function} callback Returns the pixel value for a pixel in a given axis direction
 */
function blurAxis (data, radius, x, y, callback) {
  for (let i = 0; i <= x; i++) {
    for (let j = 0; j <= y; j++) {
      let sum = { r: 0, g: 0, b: 0 }
      let pixel = {}

      // Calculate sum of pixels radius r away from the destination pixel
      for (let rad = -radius; rad < radius + 1; rad++) {
        if (j + rad > y || j + rad < 0) continue
        pixel = callback(i, j, rad)

        sum.r += pixel.r
        sum.g += pixel.g
        sum.b += pixel.b
      }

      let blur = 2 * radius + 1

      // Set pixel channel values to average value of blur
      pixel.r = Math.round(sum.r / blur)
      pixel.g = Math.round(sum.g / blur)
      pixel.b = Math.round(sum.b / blur)

      // Reset the pixel data with new colors
      data.setPixelColor(Jimp.rgbaToInt(pixel.r, pixel.g, pixel.b, 255), i, j)
    }
  }
}

module.exports = blur
