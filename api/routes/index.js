const express = require('express')

const { itemController, bidController } = require('../controllers')

const router = express.Router()

router.get('/item', itemController.getItem)
router.get('/items', itemController.getItems)

router.post('/bid', bidController.postBid)

module.exports = router
