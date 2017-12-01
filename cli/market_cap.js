const columnify = require('columnify')
const logUpdate = require('log-update')
const CoinData = require('../events/coin_data')
const cliDisplay = require('../helpers/coins/cli')

const coinData = new CoinData()

coinData.on('data', (json) => {
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
      market_cap_usd: cliDisplay.getPrice(market_cap_usd, true, '$', false),
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
    ],
    config: {
      price_usd: { align: 'right' },
      market_cap_usd: { align: 'right' },
      percent_change_24h: { align: 'right' },
      last_updated: { align: 'right' }
    }
  })

  logUpdate(string)
})

logUpdate('Loading market cap...')

coinData.poll()
