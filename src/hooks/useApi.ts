import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function useOHLCV(symbol: string) {
  const [data, setData]     = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!symbol) return
    setLoading(true)
    axios.get(`${API_URL}/ohlcv/${symbol}?limit=24`)
      .then(r => setData(r.data.reverse()))
      .finally(() => setLoading(false))
  }, [symbol])

  return { data, loading }
}

export function useHeatmap(symbol: string) {
  const [data, setData]     = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`${API_URL}/heatmap${symbol ? `?symbol=${symbol}` : ''}`)
      .then(r => setData(r.data))
      .finally(() => setLoading(false))
  }, [symbol])

  return { data, loading }
}