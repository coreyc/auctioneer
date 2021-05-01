const express = require('express')

const { exampleController } = require('../controllers')

const router = express.Router()

router.post('/example', exampleController.postExample)

module.exports = router
