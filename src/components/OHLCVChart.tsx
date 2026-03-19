import { useOHLCV } from '../hooks/useApi'
import {
  ComposedChart, Bar, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'

interface Props { symbol: string }

export function OHLCVChart({ symbol }: Props) {
  const { data, loading } = useOHLCV(symbol)

  if (loading) return (
    <div className="rounded-xl border p-4 flex items-center justify-center h-64"
      style={{ borderColor: 'var(--border)' }}>
      <span style={{ color: 'var(--text)' }}>Chargement...</span>
    </div>
  )

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <h2 style={{ color: 'var(--text-h)' }}>{symbol} — OHLCV 1h</h2>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="hour"
            tickFormatter={(v) => new Date(v).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            tick={{ fill: 'var(--text)', fontSize: 11 }}
          />
          <YAxis yAxisId="price" orientation="right" tick={{ fill: 'var(--text)', fontSize: 11 }} />
          <YAxis yAxisId="volume" orientation="left" tick={{ fill: 'var(--text)', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8 }}
            labelStyle={{ color: 'var(--text-h)' }}
          />
          <Bar yAxisId="volume" dataKey="volume" fill="var(--accent-bg)" name="Volume" />
          <Line yAxisId="price" type="monotone" dataKey="vwap"
            stroke="var(--accent)" dot={false} strokeWidth={2} name="VWAP" />
          <Line yAxisId="price" type="monotone" dataKey="high"
            stroke="#22c55e" dot={false} strokeWidth={1} strokeDasharray="4 2" name="High" />
          <Line yAxisId="price" type="monotone" dataKey="low"
            stroke="#ef4444" dot={false} strokeWidth={1} strokeDasharray="4 2" name="Low" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}