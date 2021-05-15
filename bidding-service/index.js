const { subscribe } = require('./streams-client')

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

// immediately call to start watching bids
getLatestBid()
