import React, { useState } from "react"

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
    console.log(state)
  }

  return(
    <form onSubmit={handleSubmit}>
    <div className="form-control">
      <label>Your bid</label>
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
