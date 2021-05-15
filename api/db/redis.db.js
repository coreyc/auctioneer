const redis = require('../redis')

const setItem = (item) => {
  setInTracking(item.id)
  return redis.call('JSON.SET', `item.${item.id}`, '.', JSON.stringify(item))
}

const fetchById = (id) => {
  return redis.call('JSON.GET', `item.${id}`)
}

const setInTracking = (id) => {
  return redis.hset('items-tracking', `id:${id}`, id)
}

const getFromTracking = async () => {
  const itemsTracking = await redis.hgetall('items-tracking')

  return Object.values(itemsTracking)
}

// Couldn't figure out a way to get all keys from ReJSON, so tracking ids for now and grabbing by id
const fetchAll = async () => {
  const itemIds = await getFromTracking()

  return Promise.all(itemIds.map((id) => fetchById(id)))
}

const getLastItemFromStream = (streamName) => {
  return redis.xrevrange(streamName, '+', '-', 'COUNT', '1')
}

module.exports = {
  setItem,
  fetchById,
  fetchAll,
  getLastItemFromStream
}
