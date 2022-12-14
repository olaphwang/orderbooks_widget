import { configureStore } from '@reduxjs/toolkit'
import orderBooksReducer from '../features/order-books/slice'
import orderBooksMiddleware from '../features/order-books/middleware'

const store = configureStore({
  reducer: {
    orderBooks: orderBooksReducer.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([orderBooksMiddleware])
  },
})

export default store
