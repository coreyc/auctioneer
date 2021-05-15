const { subscribe } = require('../streams-client')
const redis = require('../redis')

const postBidToStream = (newBid) => {
  return redis.postBidToStream('bid-stream', newBid)
}

const getLatestBid = () => {
  const workerFunction = (data) => {
    console.log('data from workerFunction', data)
    io.emit('highest-bid', data.newBid)
  }

  subscribe({
    groupName: 'bid-subscriber-consumer-group',
    streamName: 'bid-stream',
    readTimeout: 20,
    workerFunction
  })
}

getLatestBid()

module.exports = {
  postBidToStream
}
