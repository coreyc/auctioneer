function BiddingItem({ props }) {
  return (
    <div className="card">
      <img src="" className="product-image" />
      <p>
        Start Time: {props.startDate}
        End Time: {props.endDate}
      </p>
      <p className="price">
        Starting Bid: {props.startingBid}
        <HighestBid />
      </p>
      <input></input>
      <p><button>Enter bid</button></p>
    </div>
  )
}

export default BiddingItem
