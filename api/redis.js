const IORedis = require('ioredis')
const dotenv = require('dotenv')

dotenv.config()

module.exports = new IORedis(`//${process.env.REDIS}:6379`)
