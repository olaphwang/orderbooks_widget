let ws: WebSocket | null = null

export function openSocket() {
  closeSocket()

  ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2')

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data)
    console.log(message)
  }

  ws.onopen = () => {
    ws?.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
      }),
    )
  }

  ws.onclose = () => {
    console.log('disconnected')
  }

  ws.onerror = (err) => {
    console.log('error', err)
  }
}

export function closeSocket() {
  ws?.close()
  ws = null
}
