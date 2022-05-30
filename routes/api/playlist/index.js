const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs')

let playlist = []

fs.exists('playlist.json', (exists) => {
  if (exists) {
    const pl = fs.readFileSync('playlist.json', 'utf8')
    playlist = JSON.parse(pl)
  } else {
    fs.writeFileSync('playlist.json', JSON.stringify(playlist))
  }
})

router.get('/', (req, res) => {
  try {
    res.status(200).json({ playlist: playlist })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

module.exports = router
