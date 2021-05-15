const { publish } = require('../streams-client')
const { getLastItemFromStream, fetchById } = require('../db')
const redis = require('../redis')

const postBidToStream = (newBid) => {
  console.log(newBid)
  return redis.postBidToStream('bid-stream', newBid)
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

const getWinningBidValue = (bid) => {
  // data structure from redis will look like [ [ '1621097945378-0', [ 'newBid', '5605' ] ] ]
  return bid[0][1][1]
}

const fnToExecute = async () => {
  try {
    const lastBid = await getLastItemFromStream('bid-stream')
    const winningBid = getWinningBidValue(lastBid)
    const itemInfo = await fetchById(1) // hard-code item id we're looking for, just for now
    const eventPayload = {itemInfo, winningBid}

    // by publishing to a different stream once the bidding has ended and the item has been "won",
    // a separate service can subscribe to this stream and process the order by charging the payment on file,
    // process shipping, log the item in Redis JSON for "long-term" storage, etc.
    // Redis Streams make this very powerful!
    await publish({ streamName: 'bidding-finished-stream', maxStreamLength: 5000, eventPayload })
    console.log('bidding-finished')
    io.emit('bidding-finished', winningBid)
  } catch(err) {
    console.error('error while publishing winning bid to stream', err)
    return
  }
}

// hardcode a bid end time (30 seconds after app loads, just for demo purposes)
const bidEndTime = new Date().getTime() + 30000
executeAt(bidEndTime, fnToExecute)

module.exports = {
  postBidToStream
}
