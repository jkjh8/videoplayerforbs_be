// 1. child-process모듈의 spawn 취득
const spawn = require('child_process').spawn

let child
function playerOpen() {
  child = spawn('python', ['./python/player.py'])
  child.stdout.on('data', function (data) {
    console.log(data.toString())
  })

  child.stderr.on('data', function (data) {
    console.log(data.toString())
  })

  child.on('exit', () => {
    console.log('exit player process and reopen player')
    // playerOpen()
  })
}

playerOpen()
