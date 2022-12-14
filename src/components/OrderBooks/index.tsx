import React, { useEffect } from 'react'

import { Head } from '../Head'
import { openSocket, closeSocket } from '../../api'

function OrderBooks() {
  useEffect(() => {
    openSocket()
    return closeSocket
  }, [])

  return (
    <>
      <Head title='Order Book' />
      <div className='order-book'>Order Book</div>
      <button onClick={openSocket}>Connect</button>
      <button onClick={closeSocket}>Disconnect</button>
    </>
  )
}

export default OrderBooks
