import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import PlaceBid from './PlaceBid'

const biddingServiceSocket = socketIOClient('http://127.0.0.1:3002', {
  transports: ['websocket']
})

const apiSocket = socketIOClient('http://127.0.0.1:3001', {
  transports: ['websocket']
})

function HighestBid() {
  const [response, setResponse] = useState('')
  const [biddingFinishedresponse, setBiddingFinishedResponse] = useState('')
  const [itemData, setItemData] = useState('')

  useEffect(() => {
    const getItemData = async (itemId) => {
      const data = await fetch(`http://localhost:3001/api/item?itemId=${itemId}`)
      const itemData = await data.json()
    
      console.log(`itemData: ${JSON.stringify(itemData)}`)
    
      setItemData(itemData)
    }

    getItemData(1) // hardcode item ID for now

    biddingServiceSocket.on('highest-bid', (bid) => {
      setResponse(bid)
      return
    })

    apiSocket.on('bidding-finished', (bid) => {
      setBiddingFinishedResponse(bid)
      return
    })
  }, [])

  const showBiddingFinished = () => {
    if (biddingFinishedresponse) {
      return <div className="bidding-finished">Bidding finished, winning bid price was: ${biddingFinishedresponse}!</div>
    }
  }

  const showPlaceBid = () => {
    if (!biddingFinishedresponse) {
      return <PlaceBid />
    }
  }
 
  return (
    <div className="card">
      <p className="price">
        Item name: {itemData.name} <br></br>
        Item condition: {itemData.condition} <br></br>
        Starting bid: ${itemData.startingBid} <br></br>
        Current highest bid: ${response}
      </p>
    {showBiddingFinished()}
    {showPlaceBid()}
    </div>
  )
}

export default HighestBid
