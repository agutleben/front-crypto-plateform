import { useHeatmap } from '../hooks/useApi'

const DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
const HOURS = Array.from({ length: 24 }, (_, i) => i)

interface Props { symbol: string }

export function Heatmap({ symbol }: Props) {
  const { data, loading } = useHeatmap(symbol)

  if (loading) return (
    <div className="rounded-xl border p-4 h-48 flex items-center justify-center"
      style={{ borderColor: 'var(--border)' }}>
      <span style={{ color: 'var(--text)' }}>Chargement...</span>
    </div>
  )

  const maxVolume = Math.max(...data.map(d => d.volume), 1)

  const getCell = (day: number, hour: number) =>
    data.find(d => d.day_of_week === day && d.hour_of_day === hour)

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <h2 style={{ color: 'var(--text-h)' }}>{symbol} — Heatmap Volume</h2>
      <div className="mt-4 overflow-x-auto">
        <div className="flex gap-1 mb-1 ml-10">
          {HOURS.map(h => (
            <div key={h} className="text-center text-xs" style={{ width: 20, color: 'var(--text)' }}>
              {h}
            </div>
          ))}
        </div>
        {DAYS.map((day, dayIdx) => (
          <div key={day} className="flex items-center gap-1 mb-1">
            <div className="text-xs text-right" style={{ width: 36, color: 'var(--text)' }}>{day}</div>
            {HOURS.map(hour => {
              const cell = getCell(dayIdx + 1, hour)
              const intensity = cell ? cell.volume / maxVolume : 0
              return (
                <div
                  key={hour}
                  title={cell ? `${cell.volume.toFixed(2)} vol` : 'No data'}
                  style={{
                    width: 20, height: 20, borderRadius: 3,
                    background: cell
                      ? `rgba(170, 59, 255, ${0.1 + intensity * 0.9})`
                      : 'var(--border)',
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}