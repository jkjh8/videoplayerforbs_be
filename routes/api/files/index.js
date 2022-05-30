const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs')
const formidable = require('formidable')

/* GET users listing. */
router.get('/', async (req, res) => {
  const { dir } = req.query
  const files = []
  let targetPath = mediaFolder
  if (dir) {
    targetPath = path.join(mediaFolder, dir)
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
  const form = new formidable.IncomingForm({
    maxFileSize: 4000 * 1024 * 1024,
    maxFields: 0,
    maxFieldsSize: 200 * 1024 * 1024
  })
  form.uploadDir = mediaFolder
  form.on('field', (field, value) => {
    if (field === 'path') {
      form.uploadDir = path.join(mediaFolder, value)
    }
  })
  form.parse(req, (_, fields, files) => {
    const keys = Object.keys(files)
    keys.forEach((key) => {
      fs.renameSync(
        files[key].filepath,
        mediaFolder + '/' + files[key].originalFilename
      )
    })
    res.status(200).send('Thank you')
  })
})

router.get('/mkdir', (req, res) => {
  try {
    const { name } = req.query
    fs.mkdirSync(path.join(mediaFolder, name))
    res.status(200).send('OK')
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.get('/deleteFile', (req, res) => {
  try {
    const { name } = req.query
    console.log(path.join(mediaFolder, name))
    fs.unlinkSync(path.join(mediaFolder, name))
    res.status(200).send('OK')
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.post('/exist', (req, res) => {
  try {
    const { name } = req.body
    const file = path.join(mediaFolder, name)
    if (fs.existsSync(file)) {
      return res.status(200).json({ result: true })
    } else {
      return res.status(200).json({ result: false })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

module.exports = router
