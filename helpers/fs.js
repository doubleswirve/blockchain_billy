const glob = require('glob')
const fs = require('fs')
const util = require('util')

const mkdir = util.promisify(fs.mkdir)
const readFile = util.promisify(fs.readFile)

function globPromisified (pattern, options) {
  return new Promise((resolve, reject) => {
    glob(pattern, options, (error, files) => {
      if (error === null) {
        resolve(files)
        return
      }
      reject(error)
    })
  })
}

function readFiles (pathsAndOptions) {
  return Promise.all(
    pathsAndOptions.map(({ path, options }) => {
      return readFile(path, options)
    })
  )
}

module.exports = {
  glob: globPromisified,
  mkdir,
  readFile,
  readFiles
}
