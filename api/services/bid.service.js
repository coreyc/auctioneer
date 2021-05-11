const { subscribe } = require('../streams-client')

const postBid = () => {
  // call lua script?
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
  postBid
}
