const chalk = require('chalk')

module.exports = {
  getFullName (name, symbol) {
    return `${name} (${symbol})`
  },
  getLastUpdated (timestamp) {
    const now = parseInt(Date.now() / 1e3)
    return `${now - timestamp}s ago`
  },
  getPercentChange (percentChange) {
    const display = `${percentChange}%`

    if (percentChange === 0) {
      return display
    }

    if (percentChange < 0) {
      return chalk.red(display)
    }

    return chalk.green(display)
  },
  getPrice (price, unit, bolded) {
    const display = `${unit || '$'}${price}`

    if (bolded === false) {
      return display
    }

    return chalk.bold(display)
  }
}
