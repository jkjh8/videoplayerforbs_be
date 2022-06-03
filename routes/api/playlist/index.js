const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs')

router.get('/', (req, res) => {
  try {
    const playlist = []
    let pl
    if (fs.existsSync('./playlist.json')) {
      pl = JSON.parse(fs.readFileSync('./playlist.json', 'utf-8'))
    }
    for (let i = 0; i < pl.length; i++) {
      playlist.push({ ...pl[i], exist: fs.existsSync(pl[i].path) })
    }
    res.status(200).json({ playlist: playlist })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

router.put('/', (req, res) => {
  try {
    const { playlist } = req.body
    fs.writeFileSync('./playlist.json', JSON.stringify(playlist))
    res.status(200).json({ playlist: playlist })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})
module.exports = router
