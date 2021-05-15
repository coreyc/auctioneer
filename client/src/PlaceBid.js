import React from 'react'
import { useForm } from 'react-hook-form'

export default function PlaceBid() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    const response = await fetch('http://localhost:3001/api/bid',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      }
    )

    if (response.status === 400) {
      setError('bid', {
        type: 'server',
        message: 'Bid must be greater than the current highest bid'
      })
    }
  })

  return(
    <form onSubmit={onSubmit}>
    <div className="form-control">
      <label className="price">Your bid: </label>
      <input
        type="string"
        name="bid"
        {...register('bid', { required: "Bid is required" })}
      />
      <div className="validation">{errors.bid && errors.bid.message}</div>
    </div>
    <div className="form-control">
      <button type="submit">Place bid</button>
    </div>
  </form>
  )
}
