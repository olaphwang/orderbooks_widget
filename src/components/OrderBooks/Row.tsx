import React from 'react'
import { OrderBooksItem } from '../../features/order-books/types'

function Row({ price, count, amount }: OrderBooksItem) {
  return (
    <div className={`orderbooks__row ${count === 0 ? 'hidden' : ''}`}>
      <div className='orderbooks_count'>{count}</div>
      <div className='orderbooks_amount'>{Math.abs(amount).toFixed(4)}</div>
      <div className='orderbooks_total'>{count}</div>
      <div className='orderbooks_price'>{price}</div>
    </div>
  )
}

export default Row
