const chalk = require('chalk')
const numeral = require('numeral')

function getFullName (name, symbol) {
  return `${name} (${symbol})`
}

function getLastUpdated (timestamp) {
  const now = parseInt(Date.now() / 1e3)
  return `${now - timestamp}s ago`
}

function getPercentChange (percentChange) {
  const display = `${numeral(percentChange).format('0,0.00')}%`

  if (percentChange === 0) {
    return display
  }

  if (percentChange < 0) {
    return chalk.red(display)
  }

  return chalk.green(display)
}

function getPrice (price, whole, unit, bolded) {
  const formatter = whole === true ? '0,0' : '0,0.00'
  const display = `${unit || '$'}${numeral(price).format(formatter)}`

  if (bolded === false) {
    return display
  }

  return chalk.bold(display)
}

module.exports = {
  getFullName,
  getLastUpdated,
  getPercentChange,
  getPrice
}
