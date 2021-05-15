const { subscribe } = require('./streams-client')

// subscribe to item-ordered event stream
const workerFunction = (data) => {
  console.log('data from order-service workerFunction', data)

}

subscribe({
  groupName: 'order-subscriber-consumer-group',
  streamName: 'order-stream',
  readTimeout: 20,
  workerFunction
})

// add some made up logic to:
// (log out for each of these)
// - charge payment on file (call paypal)
// - process shipping
// - email being sent about order being completed
