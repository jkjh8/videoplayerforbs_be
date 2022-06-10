const express = require('express')
const router = express.Router()
const fs = require('fs')
const { syncPlaylist } = require('../../../api/udp')

global.playlist = []

router.get('/', (req, res) => {
  try {
    playlist = []
    let pl
    if (fs.existsSync('./playlist.json')) {
      pl = JSON.parse(fs.readFileSync('./playlist.json', 'utf-8'))
    }
    for (let i = 0; i < pl.length; i++) {
      playlist.push({ ...pl[i], exist: fs.existsSync(pl[i].path) })
    }
    res.status(200).json({ playlist })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.put('/', (req, res) => {
  try {
    playlist = req.body.playlist
    fs.writeFileSync('./playlist.json', JSON.stringify(playlist))
    res.status(200).json({ playlist })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.get('/sync', (req, res) => {
  try {
    syncPlaylist()
    res.status(200).send('OK')
  } catch (err) {
    res.status(500).json({ error: err })
  }
})
module.exports = router
