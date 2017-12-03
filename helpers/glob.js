const glob = require('glob')

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

module.exports = globPromisified
