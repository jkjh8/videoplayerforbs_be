const { updateSource } = require('../player')
const players = []

exports = module.exports = (io) => {
  const status = io.of('/status')
  const player = io.of('/player')

  status.on('connection', (socket) => {
    console.log('Status Connected Socket ', socket.id)

    socket.on('disconnect', () => {
      console.log('Status Disconnected Socket', socket.id)
    })

    socket.on('data', (args) => {
      socket.broadcast.emit('data', args)
    })
  })

  player.on('connection', (socket) => {
    players.push(socket.id)
    console.log('Player Connected Socket ', socket.id)

    socket.on('disconnect', () => {
      players.remove(socket.id)
      console.log('Player Disconnected Socket', socket.id)
    })

    socket.on('data', (args) => {
      if (players.length) {
        socket.broadcast.emit('data', args)
      } else {
        socket.emit('error', 'No Player')
      }
    })
  })

  io.on('connection', (socket) => {
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
      if (
        args.file.type.includes('video') ||
        args.file.type(includes('audio'))
      ) {
        io.emit('player', { command: 'play' })
      }
      break
    case 'clear':
      io.emit('player', { command: 'clear' })
      break
  }
}
