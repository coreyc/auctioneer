const { fetchById, fetchAll } = require('../db')

// These are simple "wrapper" functions for now but as the app complexity grows and more
// business logic is added, that logic will go within the body's of these functions.
const getItemById = (itemId) => {
  return fetchById(itemId)
}

const getAllItems = async () => {
  return fetchAll()
}

module.exports = {
  getItemById,
  getAllItems
}
