import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import PlaceBid from './PlaceBid'

const socket = socketIOClient('http://127.0.0.1:3001', {
  transports: ['websocket']
})
// socket.open()
// socket.on('connect', () => {console.log('connected clientside')})

function HighestBid() {
  const [response, setResponse] = useState('')

  useEffect(() => {

    // socket.emit('hi', 'asdfasdf')
    socket.on('highest-bid', (data) => {
      console.log('hit')
      console.log(data)
      setResponse(data.highestBid)
    })
  }, [])
 
  return (
    <>
      <p>
        ${response}
      </p>
    <PlaceBid />
    </>
  )
}

export default HighestBid;
