const { setItem, fetchById, fetchAll, getLastItemFromStream } = require('./redis.db')

module.exports = {
  setItem,
  fetchById,
  fetchAll,
  getLastItemFromStream
}