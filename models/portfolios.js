const os = require('os')
const path = require('path')
const uuid = require('uuid/v4')
const yaml = require('js-yaml')
const fsHelpers = require('../helpers/fs')

async function createLocalDataDirectory () {
  return fsHelpers.createDirectoryIfDoesNotExist(getLocalDataDirectory())
}

async function createLocalPortfoliosDirectory () {
  return fsHelpers.createDirectoryIfDoesNotExist(getLocalPortfoliosDirectory())
}

function generateLocalPortfolioId () {
  return uuid()
}

function getLocalDataDirectory () {
  return path.join(os.homedir(), '.blockchain_billy')
}

function getLocalPortfoliosDirectory () {
  // TODO: Make constant for dir name
  // TODO: Maybe allow override via env var
  return path.join(getLocalDataDirectory(), 'portfolios')
}

function getLocalPortfolioFilePath (portfolioId) {
  return path.join(getLocalPortfoliosDirectory(), `${portfolioId}.yaml`)
}

function getLocalPortfolioId ({ id }) {
  return id || generateLocalPortfolioId()
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
  return parseLocalPortfolio(portfolio)
}

async function getLocalPortfolios () {
  const portfoliosFilePaths = await getLocalPortfoliosFilePaths()
  const portfolios = await fsHelpers.readFiles(portfoliosFilePaths)
  return parseLocalPortfolios(portfolios)
}

function parseLocalPortfolios (portfolios) {
  return portfolios.map(parseLocalPortfolio)
}

function parseLocalPortfolio (portfolio) {
  return yaml.safeLoad(portfolio)
}

async function saveLocalPortfolio (portfolio) {
  await createLocalDataDirectory()
  await createLocalPortfoliosDirectory()
  const id = getLocalPortfolioId(portfolio)
  const portfolioFilePath = getLocalPortfolioFilePath(id)
  console.log(portfolioFilePath)
  const data = stringifyLocalPortfolio(Object.assign({}, portfolio, { id }))
  return fsHelpers.writeFile(portfolioFilePath, data)
}

function stringifyLocalPortfolio (portfolio) {
  return yaml.safeDump(portfolio)
}

module.exports = {
  getLocalPortfolio,
  getLocalPortfolios,
  saveLocalPortfolio
}
