const EventEmitter = require('events')
const coins = require('../models/coins')

class CoinData extends EventEmitter {
  async poll () {
    try {
      const json = await coins.getCoins()
      this.emit('data', json)
    } catch (error) {
      this.emit('error', error)
    }
    // TODO: Maybe make delay an env var/increase...
    setTimeout(() => this.poll(), 30e3)
  }
}

module.exports = CoinData
