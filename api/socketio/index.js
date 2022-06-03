const { updateSource } = require('../player')
let _status = {}

exports = module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Status Connected Socket ', socket.id)
    socket.emit('status', { ..._status })

    socket.on('disconnect', () => {
      console.log('Status Disconnected Socket', socket.id)
    })
    socket.on('status', (args) => {
      _status = { ...args }
      // if (args.command === 'ended') {
      //   io.emit('command', { command: 'stop' })
      // }
      socket.broadcast.emit('status', _status)
    })
    socket.on('get', () => {
      socket.emit('data', _status)
    })
    socket.on('command', (args) => {
      console.log(args)
      socket.broadcast.emit('command', args)
    })
    socket.on('error', (args) => {
      console.error(args)
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
