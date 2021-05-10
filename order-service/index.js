const IORedis = require('ioredis')
const dotenv = require('dotenv')

dotenv.config()

const redis = new IORedis(`//${process.env.REDIS}:6379`)


