import { useEffect, useRef, useState } from 'react'
import type { WsMessage } from '../types/index'

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/metrics'

export function useWebSocket() {
  const [data, setData] = useState<WsMessage | null>(null)
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)



  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket(WS_URL)
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WS connected')
        setConnected(true)
      }

      ws.onmessage = (e) => {
        setData(JSON.parse(e.data))
      }

      ws.onclose = () => {
        setConnected(false)
        console.log('WS disconnected, reconnecting in 3s...')
        setTimeout(connect, 3000)
      }

      ws.onerror = (e) => {
        console.error('WS error', e)
        ws.close()
      }
    }

    const timeout = setTimeout(connect, 1000) // ← délai initial
    return () => {
      clearTimeout(timeout)
      wsRef.current?.close()
    }
  }, [])

  return { data, connected }
}