const IORedis = require('ioredis')
const dotenv = require('dotenv')
const { oneLine } = require('common-tags')

dotenv.config()

const redis = new IORedis(`//${process.env.REDIS}:6379`)

redis.defineCommand('postBidToStream', {
  numberOfKeys: 1,
  lua: oneLine(`
    local streamName = KEYS[1]
    local newBid = ARGV[1]
    local lastBid = redis.call("XREVRANGE", streamName, "+", "-", "COUNT", "1")

    for key,value in pairs(lastBid) do
      for id,streamItem in pairs(value) do
        for streamItemKey,streamItemValue in pairs(id) do
          if tonumber(streamItemValue) < tonumber(newBid) then
            return streamItemValue
          else return
          end
        end
      end
    end

    return
  `)
})

module.exports = redis

/*
read from bid-stream

XREVRANGE bid-stream + - COUNT 1

redis.call("get",KEYS[1])

if latest value is less than new value
  publish new value to bid-stream
else
  return (do we need this in lua?)
*/