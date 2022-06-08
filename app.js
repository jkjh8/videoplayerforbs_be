/** @format */

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
// const logger = require('morgan')
const cors = require('cors')
const fs = require('fs')

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')

const app = express()

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// make folder
global.publicFolder = path.join(__dirname, 'public')
global.mediaFolder = path.join(__dirname, 'media')
!fs.existsSync(publicFolder) && fs.mkdirSync(publicFolder)
!fs.existsSync(mediaFolder) && fs.mkdirSync(mediaFolder)

app.use(express.static(publicFolder))
app.use('/media', express.static(mediaFolder))

// cors
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, origin)
    },
    credentials: true
  })
)

// socket io
global.io = require('socket.io')()
require('./api/socketio')(io)

app.use('/', indexRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })
require('./python')
require('./api/udp')
module.exports = app
