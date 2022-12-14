import { Middleware } from 'redux'
import { orderBooksActions } from './slice'

const chatMiddleware: Middleware = (store) => {
  let socket: WebSocket | null

  return (next) => (action) => {
    const connecting = store.getState().orderBooks.connecting
    const connected = store.getState().orderBooks.connected
    if (orderBooksActions.openSocket.match(action) && !connecting && !connected) {
      socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
      console.log('connecting socket')

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.event === 'subscribed') {
          store.dispatch(orderBooksActions.subscribed(data.chanId))
        }
        if (Array.isArray(data)) {
          store.dispatch(orderBooksActions.dataFetched(data))
        }
      }

      socket.onopen = () => {
        console.log('socket connected')
        store.dispatch(orderBooksActions.socketOpened())
        socket?.send(
          JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol: 'tBTCUSD',
          }),
        )
      }

      socket.onclose = () => {
        console.log('socket disconnected')
        store.dispatch(orderBooksActions.socketClosed())
        if (socket) {
          store.dispatch(orderBooksActions.openSocket())
        }
      }

      socket.onerror = (err) => {
        console.log('error', err)
      }
    } else if (orderBooksActions.closeSocket.match(action)) {
      const tempSocket = socket
      socket = null
      tempSocket?.close()
    }

    next(action)
  }
}

export default chatMiddleware
