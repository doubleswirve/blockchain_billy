const fetch = require('node-fetch')

async function getCoins (limit) {
  const response =
    // TODO: Maybe make URL an env var...
    await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=${limit || 100}`)
  return response.json()
}

module.exports = {
  getCoins
}
