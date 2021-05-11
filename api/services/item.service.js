const { fetchDb } = require('../db')

const getItemById = (itemId) => {
  return fetchDb(itemId)
}

module.exports = {
  getItemById
}
