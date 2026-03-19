import { Info } from 'lucide-react'

interface TooltipProps {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  width?: number
}

export function Tooltip({ text, position = 'top', width = 200 }: TooltipProps) {
  const positionStyles: Record<string, string> = {
    top: 'bottom-5 left-1/2 -translate-x-1/2',
    bottom: 'top-5 left-1/2 -translate-x-1/2',
    left: 'right-5 top-1/2 -translate-y-1/2',
    right: 'left-5 top-1/2 -translate-y-1/2',
  }

  return (
    <div className="relative group inline-flex items-center ml-1 cursor-help">
      <Info size={13} style={{ color: 'var(--text)' }} />
      <div
        className={`absolute z-50 hidden group-hover:block text-xs rounded-lg px-3 py-2 text-left ${positionStyles[position]}`}
        style={{
          width,
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
          boxShadow: 'var(--shadow)',
        }}
      >
        {text}
      </div>
    </div>
  )
}