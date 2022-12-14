import React from 'react'
import Row from './Row'
import { OrderBooksItem } from '../../features/order-books/types'

interface ListProps {
  data: OrderBooksItem[]
  side: string
}

function List({ data, side }: ListProps) {
  return (
    <div className={`orderbooks__list orderbooks__list--${side}`}>
      <div className='orderbooks__list__header'>
        <div>COUNT</div>
        <div>AMOUNT</div>
        <div>TOTAL</div>
        <div>PRICE</div>
      </div>
      {data.map((item: OrderBooksItem) => (
        <Row key={item.price} {...item} />
      ))}
    </div>
  )
}

export default List
