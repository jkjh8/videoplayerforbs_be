const playerStatus = {
  autoplay: false,
  showBigPlayBtn: false,
  loop: false,
  muted: false,
  noControls: false,
  volume: 60,
  showTooltip: false,
  source: ''
}

module.exports.updateSource = (file) => {
  playerStatus.source = file
  app.io.emit('player', { command: 'updateSource', file: file })
}
