const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs')
const formidable = require('formidable')

/* GET users listing. */
router.get('/', async (req, res) => {
  const { dir } = req.query
  const files = []
  let targetPath = mediaPath
  if (dir) {
    targetPath = path.join(mediaPath, dir)
  }
  const r = fs.readdirSync(targetPath)
  for (let i = 0; i < r.length; i++) {
    const stat = fs.statSync(path.join(targetPath, r[i]))
    files.push({
      name: r[i],
      directory: stat.isDirectory(),
      size: stat.size,
      createdAt: stat.birthtime
    })
  }
  res.json({ dir: dir, files })
})

router.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = mediaPath
  form.on('field', (field, value) => {
    if (field === 'path') {
      form.uploadDir = path.join(mediaPath, value)
    }
  })
  form.parse(req, (_, fields, files) => {
    const keys = Object.keys(files)
    keys.forEach((key) => {
      fs.renameSync(
        files[key].filepath,
        mediaPath + '/' + files[key].originalFilename
      )
    })
    res.status(200).send('Thank you')
  })
})

module.exports = router
