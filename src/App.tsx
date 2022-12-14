import React from 'react'
import { HelmetProvider } from 'react-helmet-async'

import OrderBooks from './components/OrderBooks'

function App() {
  return (
    <HelmetProvider>
      <OrderBooks />
    </HelmetProvider>
  )
}

export default App
