function index (coins) {
  return indexBy(coins, 'id')
}

function indexBy (coins, key) {
  return coins.reduce((index, coin) => {
    const value = coin[key]
    return Object.assign({}, index, {
      [value]: coin
    })
  }, {})
}

module.exports = {
  index,
  indexBy
}
