const { subscribe } = require('../streams-client')
const redis = require('../redis')

const postBidToStream = async (newBid) => {
  const res = await redis.postBidToStream('bid-stream', newBid)
  console.log(res)
  return res
}

const getLatestBid = () => {
  const workerFunction = async (data) => {
    console.log(data)
    io.emit('highest-bid', data)
  }

  subscribe({
    groupName: 'bid-subscriber-consumer-group',
    streamName: 'bid-stream',
    readTimeout: 3000,
    workerFunction
  })
}

getLatestBid()

module.exports = {
  postBidToStream
}
