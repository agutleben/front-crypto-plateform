# crypto-platform-front

> Real-time cryptocurrency analytics dashboard — React · TypeScript · Vite · Recharts

![Live](https://img.shields.io/badge/status-live-brightgreen) ![React](https://img.shields.io/badge/React-19-61dafb?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)

---

## Overview

**crypto-platform-front** is the frontend layer of a fully containerized crypto analytics platform. It connects to a FastAPI backend via WebSocket and REST to display live market data processed through a Kafka → Spark → BigQuery → dbt pipeline.

Key features:

- **Live Top Movers** — ranked by absolute price change, refreshed every 5 seconds via WebSocket
- **OHLCV Chart** — 1-hour candlestick data (VWAP, High, Low, Volume) for any selected symbol
- **Volume Heatmap** — hour × day-of-week volume distribution
- **Alert Feed** — symbols with price variation above configurable threshold
- **Auto-reconnecting WebSocket** — resilient connection with 3-second retry logic

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Charts | Recharts 3 |
| HTTP client | Axios |
| Icons | Lucide React |
| Styling | Tailwind CSS + CSS variables |

---

## Prerequisites

- Node.js ≥ 18
- Backend API running on `http://localhost:8000` (see [crypto-platform-api](../api))

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

Create a `.env` file at the root of the project:

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws/metrics
```

Both variables fall back to `localhost:8000` if not set.

---

## Project Structure

```
src/
├── components/
│   ├── Alerts.tsx          # Alert feed component
│   ├── Heatmap.tsx         # Volume heatmap grid
│   ├── OHLCVChart.tsx      # Composed OHLCV chart
│   ├── StatusBar.tsx       # Connection status + last update
│   └── TopMovers.tsx       # Ranked symbol table
├── hooks/
│   ├── useApi.ts           # useOHLCV, useHeatmap — REST hooks
│   └── useWebSocket.ts     # WebSocket hook with auto-reconnect
├── types/
│   └── index.ts            # Shared TypeScript interfaces
└── App.tsx                 # Root layout
```

---

## Available Scripts

```bash
npm run dev        # Start dev server (HMR)
npm run build      # Production build
npm run preview    # Preview production build locally
npm run lint       # ESLint
```

---

## WebSocket Behavior

The `useWebSocket` hook maintains a persistent connection to the backend. On disconnect, it automatically retries after 3 seconds. The connection status is displayed in the `StatusBar` component (● Live / ○ Disconnected).

```
ws://localhost:8000/ws/metrics
  └── push every 5s → { top_movers: [...], alerts: [...] }
```

---

## Vite Configuration Note

The following `resolve.dedupe` config is required to avoid React context conflicts with Recharts:

```ts
// vite.config.ts
resolve: {
  dedupe: ['react', 'react-dom'],
}
```

---

## Deploying to Netlify

### Build Settings

In **Site configuration → Build & deploy → Build settings**:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `18` (or higher) |

### Environment Variables

In **Site configuration → Environment variables**, add the following:

| Variable | Example value | Description |
|---|---|---|
| `VITE_API_URL` | `https://api.your-domain.com` | Base URL of the FastAPI backend |
| `VITE_WS_URL` | `wss://api.your-domain.com/ws/metrics` | WebSocket endpoint |

> ⚠️ **Important:** In production, the backend must be served over HTTPS/WSS. Browsers block mixed content — a Netlify site on `https://` cannot connect to a `ws://` or `http://` backend.

### `netlify.toml` (recommended)

Add this file at the root of the project to configure the build and SPA routing:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The `[[redirects]]` rule is required for client-side routing — without it, refreshing any page other than `/` will return a 404.

### Deploy via Netlify CLI

```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Link to your Netlify site
netlify link

# Deploy to production
netlify deploy --prod
```

---

## Backend Dependencies

This frontend requires the following API endpoints to be available:

| Endpoint | Description |
|---|---|
| `GET /ohlcv/{symbol}` | 1h OHLCV candles for a symbol |
| `GET /heatmap?symbol=` | Volume heatmap data |
| `WS /ws/metrics` | Live top movers + alerts |

See the [API README](../api/README.md) for setup instructions.

---

## Data Pipeline

```
Binance WebSocket
      │
   Kafka
      │
   Spark Structured Streaming
      │
   BigQuery RAW
      │
   dbt (every 5 min)
      │
   BigQuery MART ──► FastAPI ──► This frontend
```

---

## License

MIT