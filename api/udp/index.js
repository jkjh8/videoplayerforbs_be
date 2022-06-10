// 통신 udp
// 보내는 포트
// 192.168.0.81~84:12302

// 각 미디어 플레이어 별 수신 포트
// 192.168.0.100:9901~9904

// 제어 명령어

// 트랙 인덱스로 재생 :: playid,트랙인덱스(0~n)
// 실제 파일 이름으로 재생 :: play,실제파일이름+확장자
// 멈춤 :: stop
// 비디오 파일 리스트 받기 :: getvideolist

// 수신 메세지

// getvideolist_full,파일명,파일명...,파일명
// self.play_id,트랙인덱스
const dgram = require('dgram')
const path = require('path')
const fs = require('fs')
const server = dgram.createSocket('udp4')

server.on('listening', () => {
  const address = server.address()
  console.log(`UDP Server Listening at ${address.address}:${address.port}`)
})

server.on('message', (msg, remote) => {
  console.log(msg)
  try {
    const command = msg.toString().split(',')
    switch (command[0]) {
      case 'playid':
        io.to('player').emit('command', {
          command: 'play_id',
          index: Number(command[1])
        })
        break
      case 'play':
        io.to('player').emit('command', {
          command: 'play_direct',
          file: { path: path.join(mediaFolder, command[1]) }
        })
        break
      case 'pause':
        io.to('player').emit('command', { command: 'play_pause' })
        break
      case 'stop':
        io.to('player').emit('command', { command: 'stop' })
        break
      case 'setmute':
        io.to('player').emit('command', { command: 'set_mute', value: true })
        break
      case 'setunmute':
        io.to('player').emit('command', { command: 'set_mute', value: false })
        break
      case 'volume':
        io.to('player').emit('command', {
          command: 'set_volume',
          value: Number(command[1])
        })
        break
      case 'ff':
        io.to('player').emit('command', { command: 'set_ff' })
        break
      case 'rewind':
        io.to('player').emit('command', { command: 'set_rew' })
        break
      case 'getvideolist':
        syncPlaylist()
        break
    }
  } catch (err) {
    console.error(err)
  }
})

function sendUdpMsg(msg) {
  try {
    const client = dgram.createSocket('udp4')
    const message = Buffer.from(msg)
    const { rt_port, rt_ipaddr } = _status
    client.send(message, rt_port, rt_ipaddr, (err) => {
      if (err) {
        console.error(err)
      }
      client.close()
    })
  } catch (err) {
    console.error(err)
  }
}

function syncPlaylist() {
  console.log('sync')
  let rt
  if (_status.rt_type === 'AMX') {
    rt = playlist.map((e) => e.amx).join(',')
  } else {
    rt = playlist.map((e) => e.name).join(',')
  }
  sendUdpMsg(`getvideolist_full,${rt}`)
}

server.bind(12302, '0.0.0.0')

module.exports = { syncPlaylist, sendUdpMsg }
