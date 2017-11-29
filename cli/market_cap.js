const columnify = require('columnify')
const logUpdate = require('log-update')
const Coins = require('../events/coins')
const cliDisplay = require('../helpers/cli_display')

const coins = new Coins()

coins.on('data', (json) => {
  const data = json.map((coin) => {
    const {
      name,
      symbol,
      price_usd,
      market_cap_usd,
      percent_change_24h,
      last_updated
    } = coin
    return Object.assign({}, coin, {
      name: cliDisplay.getFullName(name, symbol),
      price_usd: cliDisplay.getPrice(price_usd),
      market_cap_usd: cliDisplay.getPrice(market_cap_usd, '$', false),
      percent_change_24h: cliDisplay.getPercentChange(percent_change_24h),
      last_updated: cliDisplay.getLastUpdated(last_updated)
    })
  })

  const string = columnify(data, {
    columns: [
      'rank',
      'name',
      'price_usd',
      'market_cap_usd',
      'percent_change_24h',
      'last_updated'
    ]
  })

  logUpdate(string)
})

logUpdate('Loading market cap...')

coins.poll()
