const fetch = require('node-fetch')

module.exports = {
  async getCoins (limit) {
    const response =
      // TODO: Maybe make URL an env var...
      await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=${limit || 20}`)
    const json = response.json()
    return json
  }
}
