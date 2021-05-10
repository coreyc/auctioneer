const express = require('express')

const { itemController } = require('../controllers')

const router = express.Router()

router.get('/item', itemController.getItem)

module.exports = router
