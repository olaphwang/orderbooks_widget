export interface OrderBooksItem {
  price: number
  count: number
  amount: number
}

export type OrderBooksData = { [id: number]: OrderBooksItem }

export interface OrderBooksState {
  data: OrderBooksData
  connecting: boolean
  connected: boolean
  subscribed: boolean
  channelId: number
}
