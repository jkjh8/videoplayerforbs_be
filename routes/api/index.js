var express = require('express')
var router = express.Router()

router.use('/files', require('./files'))
router.use('/playlist', require('./playlist'))

module.exports = router
