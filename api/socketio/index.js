const { updateSource } = require('../player')
exports = module.exports = (app) => {
  app.io.on('connection', (socket) => {
    console.log('connected ', socket.id)

    socket.on('disconnect', () => {
      console.log('disconnect ', socket.id)
    })
    socket.on('playerFunction', (args) => {
      parser(args)
    })
  })
}

function parser(args) {
  console.log(args)
  switch (args.command) {
    case 'playDirect':
      updateSource(args.file)
      app.io.emit('player', { command: 'play' })
      break
    case 'clear':
      app.io.emit('player', { command: 'clear' })
      break
  }
}
