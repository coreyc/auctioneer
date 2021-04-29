const bootstrap = async (items, redis) => {
  for (const item of items) {
    const { id, name, startingBid, currentBid } = item

    await redis.call('JSON.SET', `item.${id}`, '.', JSON.stringify({ name, startingBid, currentBid }))
  }
}

module.exports = bootstrap