const os = require('os')
const path = require('path')
const yaml = require('js-yaml')
const fsHelpers = require('../helpers/fs')

function getLocalPortfoliosDirectory () {
  // TODO: Make constant for dir name
  // TODO: Maybe allow override via env var
  return path.join(os.homedir(), '.blockchain_billy', 'portfolios')
}

function getLocalPortfolioFilePath (portfolioId) {
  return path.join(getLocalPortfoliosDirectory(), `${portfolioId}.yaml`)
}

async function getLocalPortfoliosFilePaths () {
  const paths = await fsHelpers.glob('*.yaml', {
    absolute: true,
    cwd: getLocalPortfoliosDirectory()
  })
  return paths.map((path) => {
    return { path }
  })
}

async function getLocalPortfolio (portfolioId) {
  const portfolioFilePath = getLocalPortfolioFilePath(portfolioId)
  const portfolio = await fsHelpers.readFile(portfolioFilePath)
  return parsePortfolio(portfolio)
}

async function getLocalPortfolios () {
  const portfoliosFilePaths = await getLocalPortfoliosFilePaths()
  const portfolios = await fsHelpers.readFiles(portfoliosFilePaths)
  return parsePortfolios(portfolios)
}

function parsePortfolios (portfolios) {
  return portfolios.map(parsePortfolio)
}

function parsePortfolio (portfolio) {
  return yaml.safeLoad(portfolio)
}

module.exports = {
  getLocalPortfolio,
  getLocalPortfolios
}
