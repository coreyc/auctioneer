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
    console.log('useeffect hit')
    socket.on('highest-bid', (bid) => {
      console.log('bid received from socket (on client):', bid)
      setResponse(bid)

      return
    })
  }, [])
 
  return (
    <>
      <p>
        Current highest bid: ${response}
      </p>
    <PlaceBid />
    </>
  )
}

export default HighestBid;
