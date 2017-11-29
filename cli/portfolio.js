const columnify = require('columnify')
const fs = require('fs')
const logUpdate = require('log-update')
const path = require('path')
const util = require('util')
const yaml = require('js-yaml')
const Coins = require('../events/coins')
const cliDisplay = require('../helpers/cli_display')

const readFileAsync = util.promisify(fs.readFile)

function indexData (data, key) {
  return data.reduce((index, coin) => {
    const value = coin[key]
    return Object.assign({}, index, {
      [value]: coin
    })
  }, {})
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
        name: cliDisplay.getFullName(coin.name, coin.symbol),
        holding: cliDisplay.getPrice(coin.price_usd * total),
        usd_price_last_updated: cliDisplay.getLastUpdated(coin.last_updated)
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
