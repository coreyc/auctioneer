import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function PlaceBid() {
  const [state, setState] = useState({
    bid: '',
  })

  const handleInputChange = (event) => {
    setState((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    fetch('http://localhost:3001/api/bid',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({newBid: state.bid})
    })
  }

  return(
    <form onSubmit={handleSubmit}>
    <div className="form-control">
      <label className="price">Your bid: </label>
      <input
        type="string"
        name="bid"
        value={state.bid}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-control">
      <label></label>
      <button type="submit">Place bid</button>
    </div>
  </form>
  )
}
