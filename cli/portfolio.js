const chalk = require('chalk')
const columnify = require('columnify')
const fs = require('fs')
const logUpdate = require('log-update')
const path = require('path')
const util = require('util')
const yaml = require('js-yaml')
const Coins = require('../events/coins')

const readFileAsync = util.promisify(fs.readFile)

function indexData (data, key) {
  return data.reduce((index, coin) => {
    const value = coin[key]
    return Object.assign({}, index, {
      [value]: coin
    })
  }, {})
}

// TODO: Break these out into helper funcs
function getNameDisplay (name, symbol) {
  return `${name} (${symbol})`
}

function getPriceDisplay (price) {
  return chalk.bold(`$${price}`)
}

function getLastUpdatedDisplay (lastUpdated) {
  const now = parseInt(Date.now() / 1e3)
  return `${now - lastUpdated}s ago`
}

async function run () {
  const filename = path.join(__dirname, '../portfolios/sample.yaml')
  const sampleYaml = await readFileAsync(filename)
  const coins = new Coins()
  const portfolio = yaml.safeLoad(sampleYaml)

  coins.on('data', (json) => {
    const index = indexData(json, 'symbol')
    const data = portfolio.holdings.map(({symbol, total}) => {
      const coin = index[symbol]
      return {
        name: getNameDisplay(coin.name, coin.symbol),
        holding: getPriceDisplay(coin.price_usd * total),
        usd_price_last_updated: getLastUpdatedDisplay(coin.last_updated)
      }
    })
    const string = columnify(data, {
      columns: [
        'name',
        'holding',
        'usd_price_last_updated'
      ]
    })
    logUpdate(string)
  })

  coins.poll()
}

logUpdate('Loading portfolio...')
run()
