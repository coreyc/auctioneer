const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('App is working'))

const server = http.createServer(app)
server.listen(3002, () => console.log('Bidding service listening on port 3002!'))

const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('new socketio connection - bidding service')
})

// hacky, TODO: don't do this :)
global.io = io

const { subscribe } = require('./streams-client')

// TODO: end subscriber when bidding ends
const getLatestBid = () => {
  const workerFunction = (data) => {
    console.log('data from workerFunction - bidding service', data)
    io.emit('highest-bid', data.newBid)
  }

  subscribe({
    groupName: 'bid-subscriber-consumer-group',
    streamName: 'bid-stream',
    readTimeout: 20,
    workerFunction
  })
}

// immediately call to start watching bids
getLatestBid()
