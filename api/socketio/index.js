global._status = {}
const { syncPlaylist } = require('../../api/udp')

exports = module.exports = () => {
  io.on('connection', (socket) => {
    const mode = socket.handshake.query.client
    if (mode === 'player') {
      socket.join('player')
      console.log('connected player id ', socket.id)
      io.to('player').emit('command', { command: 'get_playlist' })
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
    socket.on('playlist', (list) => {
      playlist = list
      syncPlaylist()
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
