import './App.css'

function ItemPreviewCard({ data }) {
  const { name, startDate, endDate } = data
  return (
    <div className="card">
      <p className="item-preview">
        Item: {name}
        <br></br>
        Start Time: {startDate}
        <br></br>
        End Time: {endDate}
        <br></br>
      </p>
    </div>
  )
}

export default ItemPreviewCard
