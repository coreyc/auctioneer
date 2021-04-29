const { postDb } = require('../db')

const createExample = async (user, content) => {
  return postDb(user, content)
}

module.exports = {
  createExample
}
