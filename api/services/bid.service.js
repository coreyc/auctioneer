const { publish, subscribe } = require('../streams-client')
const { getLastItemFromStream } = require('../db')
const redis = require('../redis')

const postBidToStream = (newBid) => {
  console.log(newBid)
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

const executeAt = (scheduledTime, fnToExecute) => {
  const currentTime = new Date().getTime()

  if(currentTime > scheduledTime){
    console.error('The scheduled time has already passed')
    return
  }

  setTimeout(fnToExecute, scheduledTime - currentTime)
  return
}

const fnToExecute = async () => {
  try {
    const lastBid = await getLastItemFromStream('bid-stream')
    const itemInfo = await fetchById(1) // hard-code item id we're looking for, just for now
    await redis.publish({ streamName: 'bidding-finished-stream', maxStreamLength: 5000, eventPayload })
    io.emit('bidding-finished', winningBid)
  } catch(err) {
    console.error('error while publishing winning bid to stream', err)
    return
  }
}

// TODO: end subscriber after item bidding ends
const watchForEndOfBidding = () => {
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

// immediately call in order to start subscribing to stream and emitting events via socket.io
getLatestBid()
watchForEndOfBidding()

module.exports = {
  postBidToStream
}
