const IORedis = require('ioredis')
const dotenv = require('dotenv')
const { oneLine } = require('common-tags')

dotenv.config()

const redis = new IORedis(`//${process.env.REDIS}:6379`)

// 'value' in the lua script below looks like [ '1621041237325-0', [ 'newBid', '4' ] ]
// which I had a tough time looping through using pairs/ipairs
// we know that the stream item structure shouldn't change, so just hardcode the indexes here

// we do an `isempty` check since the stream will be empty on first bid
redis.defineCommand('postBidToStream', {
  numberOfKeys: 1,
  lua: oneLine(`
    local streamName = KEYS[1]
    local newBid = ARGV[1]
    local lastBidStreamItem = redis.call("XREVRANGE", streamName, "+", "-", "COUNT", "1")

    local function isempty(table)
      return #table==0
    end

    if isempty(lastBidStreamItem) then
      return redis.call("XADD", streamName, "MAXLEN", "~", "1000", "*", "newBid", newBid)
    end

    for key,value in pairs(lastBidStreamItem) do
      local lastBidValue = value[2][2]

      if tonumber(lastBidValue) < tonumber(newBid) then
        return redis.call("XADD", streamName, "MAXLEN", "~", "1000", "*", "newBid", newBid)
      end

      return
    end
  `)
})

module.exports = redis
