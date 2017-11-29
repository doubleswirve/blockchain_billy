const fetch = require('node-fetch')

module.exports = {
  async getCoins (limit) {
    const response =
      await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=${limit || 100}`)
    const json = response.json()
    return json
  }
}
