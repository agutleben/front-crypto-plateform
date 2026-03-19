export interface TopMover {
  symbol: string
  vwap: number
  price_change_pct: number
  direction: 'UP' | 'DOWN' | 'FLAT'
  trade_count: number
  abs_change_pct: number
  window_end: string
}

export interface Alert {
  symbol: string
  price_change_pct: number
  vwap: number
  direction: 'UP' | 'DOWN' | 'FLAT'
  window_end: string
}

export interface OHLCV {
  symbol: string
  hour: string
  trade_count: number
  volume: number
  turnover: number
  low: number
  high: number
  vwap: number
}

export interface HeatmapCell {
  symbol: string
  hour_of_day: number
  day_of_week: number
  trade_count: number
  volume: number
  avg_price: number
}

export interface WsMessage {
  top_movers: TopMover[]
  alerts: Alert[]
}