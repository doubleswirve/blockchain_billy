const blessed = require('blessed')

const screen = blessed.screen()
const box = blessed.box({
  content: 'Hello, world'
})

screen.append(box)

let index = 0

setInterval(() => {
  box.setContent(`index = ${index++}`)
  screen.render()
}, 5e2)

screen.render()
