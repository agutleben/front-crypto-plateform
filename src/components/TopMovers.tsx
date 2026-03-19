import type { TopMover } from '../types/index'

interface Props {
  data: TopMover[]
  onSelect: (symbol: string) => void
  selected: string
}

export function TopMovers({ data, onSelect, selected }: Props) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <h2 style={{ color: 'var(--text-h)' }}>Top Movers</h2>
      <table className="w-full text-sm mt-3">
        <thead>
          <tr style={{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>
            <th className="text-left pb-2">Symbol</th>
            <th className="text-right pb-2">VWAP</th>
            <th className="text-right pb-2">Change %</th>
            <th className="text-right pb-2">Trades</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.symbol}
              onClick={() => onSelect(row.symbol)}
              className="cursor-pointer transition-colors"
              style={{
                borderBottom: '1px solid var(--border)',
                background: selected === row.symbol ? 'var(--accent-bg)' : 'transparent',
              }}
            >
              <td className="py-2 font-mono font-bold" style={{ color: 'var(--text-h)' }}>
                {row.symbol}
              </td>
              <td className="py-2 text-right font-mono" style={{ color: 'var(--text)' }}>
                {row.vwap.toLocaleString()}
              </td>
              <td className="py-2 text-right font-mono font-bold" style={{
                color: row.direction === 'UP' ? '#22c55e' : row.direction === 'DOWN' ? '#ef4444' : 'var(--text)'
              }}>
                {row.direction === 'UP' ? '▲' : row.direction === 'DOWN' ? '▼' : '─'}
                {' '}{Math.abs(row.price_change_pct).toFixed(4)}%
              </td>
              <td className="py-2 text-right" style={{ color: 'var(--text)' }}>
                {row.trade_count.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}