const IORedis = require(`ioredis`)
const { items } = require(`./auction-items.json`)
const bootstrap = require(`./bootstrap`)

const redis = new IORedis()

await bootstrap(items, redis)
