import type { Alert } from '../types/index'
import { Bell } from 'lucide-react'
import { Tooltip } from './Tooltip'

interface Props {
  data: Alert[]
}

export function Alerts({ data }: Props) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <div className="flex items-center gap-2 mb-3">
        <Bell size={18} style={{ color: 'var(--accent)' }} />
        <h2 style={{ color: 'var(--text-h)' }}>Alerts</h2>
        <Tooltip 
          text="Triggered when |price_change_pct| > 0.5% over the last 5-minute window" 
          position="right"
          width={220}
        />
        {data.length > 0 && (
          <span className="ml-auto text-xs px-2 py-1 rounded-full font-bold"
            style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
            {data.length}
          </span>
        )}
      </div>
      {data.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--text)' }}>No active alerts</p>
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((alert, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2"
              style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}>
              <span className="font-mono font-bold" style={{ color: 'var(--text-h)' }}>
                {alert.symbol}
              </span>
              <span className="font-mono font-bold" style={{
                color: alert.direction === 'UP' ? '#22c55e' : '#ef4444'
              }}>
                {alert.direction === 'UP' ? '▲' : '▼'}
                {' '}{Math.abs(alert.price_change_pct).toFixed(4)}%
              </span>
              <span className="text-xs" style={{ color: 'var(--text)' }}>
                {new Date(alert.window_end).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}