const EventEmitter = require('events')
const coins = require('../models/coins')

class Coins extends EventEmitter {
  async poll () {
    const json = await coins.getCoins()
    this.emit('data', json)
    // TODO: Maybe make delay an env var/increase...
    setTimeout(() => this.poll(), 20e3)
  }
}

module.exports = Coins
