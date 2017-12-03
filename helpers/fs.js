const glob = require('glob')
const fs = require('fs')
const util = require('util')

const mkdir = util.promisify(fs.mkdir)
const readFile = util.promisify(fs.readFile)
const stat = util.promisify(fs.stat)

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

async function isDirectory (path) {
  const stats = await stat(path)
  return stats.isDirectory()
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
  isDirectory,
  mkdir,
  readFile,
  readFiles
}
