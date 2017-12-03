const glob = require('glob')
const fs = require('fs')
const util = require('util')

const mkdir = util.promisify(fs.mkdir)
const readFile = util.promisify(fs.readFile)
const stat = util.promisify(fs.stat)
const writeFile = util.promisify(fs.writeFile)

async function createDirectoryIfDoesNotExist (path, mode) {
  const directoryExists = await isDirectory(path)
  if (directoryExists) {
    return
  }
  return mkdir(path, mode)
}

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
  try {
    const stats = await stat(path)
    return stats.isDirectory()
  } catch (error) {
    return false
  }
}

function readFiles (pathsAndOptions) {
  return Promise.all(
    pathsAndOptions.map(({ path, options }) => {
      return readFile(path, options)
    })
  )
}

module.exports = {
  createDirectoryIfDoesNotExist,
  glob: globPromisified,
  isDirectory,
  mkdir,
  readFile,
  readFiles,
  writeFile
}
