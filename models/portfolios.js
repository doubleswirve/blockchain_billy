const os = require('os')
const path = require('path')
const yaml = require('js-yaml')
const fsHelpers = require('../helpers/fs')
const glob = require('../helpers/glob')

async function getLocalPortfoliosFilePaths () {
  // TODO: Make constant for dir name
  const localDirectory = path.join(os.homedir(), '.blockchain_billy')
  const filenames = await glob('*.yaml', { cwd: localDirectory })
  return filenames.map((filename) => {
    return { path: path.join(localDirectory, filename) }
  })
}

async function getLocalPortfolios () {
  const portfoliosFilePaths = await getLocalPortfoliosFilePaths()
  const portfolios = await fsHelpers.readFiles(portfoliosFilePaths)

  return parsePortfolios(portfolios)
}

function parsePortfolios (portfolios) {
  return portfolios.map(yaml.safeLoad)
}

module.exports = {
  getLocalPortfolios
}
