const chalk = require('chalk')
const columnify = require('columnify')
const logUpdate = require('log-update')
const Coins = require('../events/coins')

const coins = new Coins()

function getNameDisplay (name, symbol) {
  return `${name} (${symbol})`
}

function getPercentChangeDisplay (percentChange) {
  const percentDisplayString = `${percentChange}%`

  if (percentChange === 0) {
    return percentDisplayString
  }

  if (percentChange < 0) {
    return chalk.red(percentDisplayString)
  }

  return chalk.green(percentDisplayString)
}

function getPriceDisplay (price) {
  return chalk.bold(`$${price}`)
}

function getLastUpdatedDisplay (lastUpdated) {
  const now = parseInt(Date.now() / 1e3)
  return `${now - lastUpdated}s ago`
}

coins.on('data', (json) => {
  const formattedData = json.map((coin) => {
    const {
      name,
      symbol,
      price_usd,
      market_cap_usd,
      percent_change_24h,
      last_updated
    } = coin
    return Object.assign({}, coin, {
      name: getNameDisplay(name, symbol),
      price_usd: getPriceDisplay(price_usd),
      market_cap_usd: getPriceDisplay(market_cap_usd),
      percent_change_24h: getPercentChangeDisplay(percent_change_24h),
      last_updated: getLastUpdatedDisplay(last_updated)
    })
  })
  const string = columnify(formattedData, {
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

logUpdate('Loading coins...')
coins.poll()
