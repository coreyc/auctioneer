const IORedis = require(`ioredis`)
const dotenv = require(`dotenv`)
const { items } = require(`./auction-items.json`)
const { addInitialAuctionItems } = require(`./bootstrap`)

dotenv.config()

const redis = new IORedis(`//${process.env.REDIS}:6379`)

await addInitialAuctionItems(items, redis)
