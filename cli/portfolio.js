const columnify = require('columnify')
const fs = require('fs')
const logUpdate = require('log-update')
const path = require('path')
const util = require('util')
const yaml = require('js-yaml')
const Coins = require('../events/coin_data')
const cliDisplay = require('../helpers/coins/cli')
const coinData = require('../helpers/coins/data')

const readFileAsync = util.promisify(fs.readFile)

async function run () {
  const filename = path.join(__dirname, '../portfolios/sample.yaml')
  const sampleYaml = await readFileAsync(filename)
  const coins = new Coins()
  const portfolio = yaml.safeLoad(sampleYaml)

  coins.on('data', (json) => {
    const index = coinData.index(json)

    const data = portfolio.holdings.map(({id, total}) => {
      const coin = index[id]

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
