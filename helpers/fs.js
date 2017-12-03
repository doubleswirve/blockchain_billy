const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)

function readFiles (pathsAndOptions) {
  return Promise.all(
    pathsAndOptions.map(({ path, options }) => {
      return readFile(path, options)
    })
  )
}

module.exports = {
  readFile,
  readFiles
}
