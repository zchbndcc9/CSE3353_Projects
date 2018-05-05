/**
 * Zach's Image Processing (ZIMP)
 * All source files are inside of the src/ folder
 */
const greyscale = require('./src/greyscale')
const sharpen = require('./src/sharpen')
const blur = require('./src/blur')
const connect = require('./src/connect')

module.exports = {
  greyscale,
  sharpen,
  blur,
  connect
}
