import { useState } from 'react'
import { useWebSocket } from './hooks/useWebSocket'
import { TopMovers } from './components/TopMovers'
import { Alerts } from './components/Alerts'
import { OHLCVChart } from './components/OHLCVChart'
import { Heatmap } from './components/Heatmap'
import { StatusBar } from './components/StatusBar'

export default function App() {
  const { data, connected } = useWebSocket()
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT')

  const lastUpdate = data?.top_movers?.[0]?.window_end
    ? new Date(data.top_movers[0].window_end).toLocaleTimeString()
    : ''

  return (
    <div style={{ minHeight: '100svh', background: 'var(--bg)' }}>
      <StatusBar connected={connected} lastUpdate={lastUpdate} />

      <main className="p-4 flex flex-col gap-4">
        {/* Row 1 : Top Movers + Alertes */}
        <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: '1fr 380px' }}>
          <TopMovers
            data={data?.top_movers ?? []}
            onSelect={setSelectedSymbol}
            selected={selectedSymbol}
          />
          <Alerts data={data?.alerts ?? []} />
        </div>

        {/* Row 2 : OHLCV Chart */}
        <OHLCVChart symbol={selectedSymbol} />

        {/* Row 3 : Heatmap */}
        <Heatmap symbol={selectedSymbol} />
      </main>
    </div>
  )
}