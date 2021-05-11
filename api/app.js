const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('App is working'))

app.use('/api', routes)

const server = http.createServer(app)
server.listen(3001, () => console.log('Example app listening on port 3001!'))

const options = {
  cors: true,
  origins: ['http://127.0.0.1:3000']
}
const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('new socketio connection')
  setInterval(() => {
    console.log('hit')
    socket.emit('hi', 'hi')
  }, 2000)
})

module.exports = {
  app
}
