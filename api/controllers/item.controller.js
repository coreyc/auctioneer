const { itemService } = require('../services')

const { getItemById } = itemService

const getItem = async (req, res, next) => {
  const {itemId} = req.query
  try {
    const item = await getItemById(itemId)
    res.send(item)
    next()
  } catch(err) {
    console.error(err)
    res.sendStatus(500) && next(err)
  }
}

module.exports = {
  getItem
}
