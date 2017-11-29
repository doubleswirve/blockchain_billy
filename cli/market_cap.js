const chalk = require('chalk')
const logUpdate = require('log-update')

let i = 0

setInterval(() => {
  logUpdate(
`
  billy ${chalk.blue(i++)}
`
  )
}, 1e3)
