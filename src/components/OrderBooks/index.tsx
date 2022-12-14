import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from '../Head'
import Header from './Header'
import List from './List'
import { orderBooksActions } from '../../features/order-books/slice'
import { OrderBooksItem } from '../../features/order-books/types'
import './style.css'

function OrderBooks() {
  const orderBooksData = useSelector((state: any) => state.orderBooks.data)
  const dispatch = useDispatch()

  const openSocket = () => dispatch(orderBooksActions.openSocket())
  const closeSocket = () => dispatch(orderBooksActions.closeSocket())

  useEffect((): any => {
    openSocket()
    return closeSocket
  }, [])

  const allItems: OrderBooksItem[] = Object.values(orderBooksData)
  const leftItems: OrderBooksItem[] = allItems.filter(
    (item): boolean => item.amount > 0 && item.count > 0,
  )
  const rightItems: OrderBooksItem[] = allItems.filter(
    (item: OrderBooksItem): boolean => item.amount < 0 && item.count > 0,
  )
  leftItems.sort((item1, item2) => (item1.price < item2.price ? 1 : -1))
  rightItems.sort((item1, item2) => (item1.price > item2.price ? 1 : -1))

  return (
    <>
      <Head title='Order Book' />
      <button onClick={openSocket}>Connect</button>
      <button onClick={closeSocket}>Disconnect</button>
      <div className='orderbooks'>
        <Header />
        <div className='orderbooks__columns'>
          <List data={leftItems} side='left' />
          <List data={rightItems} side='right' />
        </div>
      </div>
    </>
  )
}

export default OrderBooks
