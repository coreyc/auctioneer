const { fetchDb } = require('../db')

const getItemById = async (itemId) => {
  return fetchDb(itemId)
}

module.exports = {
  getItemById
}
