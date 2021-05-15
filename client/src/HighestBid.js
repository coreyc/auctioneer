import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import PlaceBid from './PlaceBid'

const socket = socketIOClient('http://127.0.0.1:3001', {
  transports: ['websocket']
})

function HighestBid() {
  const [response, setResponse] = useState('')

  useEffect(() => {
    socket.on('highest-bid', (bid) => {
      setResponse(bid)

      return
    })
  }, [])
 
  return (
    <div className="card">
      <p className="price">
        Item name: Golf club set <br></br>
        Item condition: Used, Very Good <br></br>
        Current highest bid: ${response}
      </p>
    <PlaceBid />
    </div>
  )
}

export default HighestBid
