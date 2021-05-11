const IORedis = require('ioredis')
const dotenv = require('dotenv')

dotenv.config()

const redis = new IORedis(`//${process.env.REDIS}:6379`)

// subscribe to item-ordered event stream

// add some made up logic to:
// (log out for each of these)
// - charge payment on file (call paypal)
// - process shipping
// - email being sent about order being completed
