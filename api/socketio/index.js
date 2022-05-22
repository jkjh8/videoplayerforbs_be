exports = module.exports = (app) => {
  app.io.on('connection', (socket) => {
    console.log('connected ', socket.id)

    socket.on('disconnect', () => {
      console.log('disconnect ', socket.id)
    })
  })
}
