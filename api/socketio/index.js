let _status = {}

exports = module.exports = (io) => {
  io.on('connection', (socket) => {
    const mode = socket.handshake.query.client
    if (mode === 'player') {
      socket.join('player')
      console.log('connected player id ', socket.id)
    } else {
      socket.join('client')
      console.log('connected client id ', socket.id)
      if (_status.length) {
        io.to('client').emit('status', { ..._status })
      }
    }
    socket.on('disconnect', () => {
      console.log('Status Disconnected Socket', socket.id)
    })
    socket.on('status', (args) => {
      _status = { ...args }
      io.to('client').emit('status', _status)
    })
    socket.on('get', () => {
      socket.emit('data', _status)
    })
    socket.on('command', (args) => {
      console.log(args)
      io.to('player').emit('command', args)
    })
    socket.on('error', (args) => {
      console.error(args)
    })
  })
}
