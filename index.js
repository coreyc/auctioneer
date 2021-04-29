const IORedis = require(`ioredis`)
const { items } = require(`./auction-items.json`)
const { addInitialAuctionItems } = require(`./bootstrap`)

const redis = new IORedis()

await addInitialAuctionItems(items, redis)
