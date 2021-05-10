const redis = require('../redis')

const fetchDb = (id) => {
  return redis.call('JSON.GET', `item.${id}`)
}

module.exports = {
  fetchDb
}
