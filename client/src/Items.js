import { useState, useEffect } from 'react'
import ItemPreviewCard from './ItemPreviewCard'

function Items() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async() => {
      const data = await fetch('http://localhost:3001/api/items')
      const items = (await data.json()).map((item) => JSON.parse(item))

      setItems(items)
    }

    fetchItems()
  }, [])

  return (
    <>
      {items.map((item) => {
        return <ItemPreviewCard data={item}/>
      })}
    </>
  )
}

export default Items
