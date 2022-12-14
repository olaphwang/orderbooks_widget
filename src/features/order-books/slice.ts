import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderBooksState } from './types'

const initialState: OrderBooksState = {
  data: {},
  connecting: false,
  connected: false,
  subscribed: false,
  channelId: 0,
}

const orderBooksSlice = createSlice({
  name: 'orderBooks',
  initialState,
  reducers: {
    openSocket: (state) => {
      state.connecting = true
    },
    socketOpened: (state) => {
      state.connecting = false
      state.connected = true
    },
    closeSocket: (state) => {
      state.subscribed = false
      state.channelId = 0
    },
    socketClosed: (state) => {
      state.connecting = false
      state.connected = false
    },
    subscribed: (state, action: PayloadAction<number>) => {
      state.data = {}
      state.subscribed = true
      state.channelId = action.payload
    },
    dataFetched: (state, action: PayloadAction<any[]>) => {
      if (!state.subscribed) return

      const [channelId, data] = action.payload

      let items: number[][] = []
      if (Array.isArray(data)) {
        items = Array.isArray(data[0]) ? data : [data]
      }

      const updates = items.reduce((acc, cur: number[]) => {
        const [price, count, amount] = cur
        return { ...acc, [price]: { price, count, amount } }
      }, {})

      state.data = { ...state.data, ...updates }
    },
  },
})

export const orderBooksActions = orderBooksSlice.actions

export default orderBooksSlice
