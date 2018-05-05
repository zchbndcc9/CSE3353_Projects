const RGBtoGrey = require('./pixels-to-greyscale')
const Jimp = require('jimp')
const Chance = require('chance')
const Set = require('./set')
const chance = new Chance()

/**
 * Analyzes a photo in order to determine what components of the image are
 * connected. See report for more information
 * @param {string} imgName Source file of the image
 * @param {string} newImg Destination file of the image. If no destination is
 * provided, the original image will be overwritten
 */
function connect (imgName, newImg = imgName) {
  Jimp.read(imgName).then(imgSrc => {
    let threshold = getThreshold(imgSrc)
    let binaryImg = transformToBinary(imgSrc, threshold)
    const labelSet = new Set()
    let nextLabel = 1
    for (let y = 0; y < imgSrc.bitmap.height; y++) {
      for (let x = 0; x < imgSrc.bitmap.width; x++) {
        let curr = binaryImg.getPixelColor(x, y)
        // Guard against edge case to prevent Jimp's default image wrapping
        let left = (x === 0) ? 0 : binaryImg.getPixelColor(x - 1, y)
        let up = (y === 0) ? 0 : binaryImg.getPixelColor(x, y - 1)
        // skip if background pixel
        if (curr === 0) {
          continue
        } else if (left === 0 && up === 0) {
          // No neighbors so create new label and add new label to the disjoint
          // set list
          binaryImg.setPixelColor(nextLabel, x, y)
          labelSet.add(nextLabel)
          nextLabel++
        } else if (left !== 0) {
          if (up !== 0) {
            // If there is a neighbor to the left and above current pixel
            // Set current pixel to label of pixel above and merge the disjoint
            // sets of the left label and upper label to establish equivalence
            // relation
            binaryImg.setPixelColor(up, x, y)
            labelSet.union(up, left)
          } else {
            // If there is no neighbor above current pixel, set current pixel
            // label to that of the left neighbor
            binaryImg.setPixelColor(left, x, y)
          }
        } else {
          binaryImg.setPixelColor(up, x, y)
        }
      }
    }
    changeComponentColors(binaryImg, labelSet)
    binaryImg.write(newImg)
  })
}

/**
 * Changes the pixel color in an image according to its equivalence relation
 * @param {data} imgSrc Image file that will be rewritten by new color values
 * @param {Set} labelSet Set containing the equivalence pairs for a given label
 * and it's surrounding pixels
 */
function changeComponentColors (imgSrc, labelSet) {
  // Store label with corresponding color values
  const colors = {}
  for (let y = 0; y < imgSrc.bitmap.height; y++) {
    for (let x = 0; x < imgSrc.bitmap.width; x++) {
      let curr = imgSrc.getPixelColor(x, y)
      // Don't do anything if it is a background pixel
      if (curr === 0) continue
      // Find the root label for the current label of the pixel
      let label = labelSet.find(curr)
      if (!colors[label]) {
        colors[label] = parseInt(chance.string({
          pool: '1234567890abcdef',
          length: 8
        }), 16)
      }
      imgSrc.setPixelColor(colors[label], x, y)
    }
  }
}

function getThreshold (imgSrc) {
  let avg = 0
  imgSrc.scan(0, 0, imgSrc.bitmap.width, imgSrc.bitmap.height, function (x, y) {
    let hex = RGBtoGrey(imgSrc, x, y)
    let pixel = Jimp.intToRGBA(hex)
    avg += pixel.r
  })
  return Math.round(avg / (imgSrc.bitmap.width * imgSrc.bitmap.height))
}

function transformToBinary (imgSrc, threshold) {
  let newSrc = imgSrc.clone()
  imgSrc.scan(0, 0, imgSrc.bitmap.width, imgSrc.bitmap.height, function (x, y, idx) {
    let hex = RGBtoGrey(imgSrc, x, y)
    let pixel = Jimp.intToRGBA(hex)
    // Sets pixel value to either one white or black
    newSrc.setPixelColor(pixel.r < threshold ? 0 : parseInt('ffffffff', 16), x, y)
  })
  return newSrc
}

module.exports = connect
