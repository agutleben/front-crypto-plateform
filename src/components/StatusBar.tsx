interface Props { connected: boolean, lastUpdate: string }

export function StatusBar({ connected, lastUpdate }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-xs"
      style={{ borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>
      <span>Crypto Analytics Platform</span>
      <div className="flex items-center gap-2">
        <span style={{ color: connected ? '#22c55e' : '#ef4444' }}>
          {connected ? '● Live' : '● Disconnected'}
        </span>
        {lastUpdate && <span>Mis à jour : {lastUpdate}</span>}
      </div>
    </div>
  )
}