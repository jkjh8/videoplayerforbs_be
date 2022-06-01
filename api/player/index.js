const playerStatus = {
  type: 'status',
  command: '',
  status: 0,
  isFullscreen: false,
  duration: 0,
  curTime: 0,
  position: 0,
  os: '',
  file: null,
  volume: 70,
  mute: false,
  scale: null,
  rate: 1,
  loop: false,
  loopAll: false,
  playMode: 'Nomal',
  playing: false
}

module.exports.updateSource = (file) => {
  playerStatus.source = file
  app.io.emit('source', { file: file })
}
