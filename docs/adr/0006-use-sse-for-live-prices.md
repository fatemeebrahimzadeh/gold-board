# ADR 0006: Use Server-Sent Events (SSE) for Live Price Streaming

## Status
Approved

## Context
Our gold and currency dashboard requires real-time, high-frequency price updates (every 3 seconds). The initial approach used traditional HTTP polling, which introduced high overhead, unnecessary client requests, and stale data. We needed a mechanism to stream data efficiently from the server to the client.

We evaluated two main real-time protocols: WebSockets and Server-Sent Events (SSE). 
During early integration with external crypto APIs (CoinGecko), we also hit strict third-party Rate Limits (HTTP 429 / 500 Internal Server Error), meaning our architecture must abstract the data fetching logic entirely on the server-side to protect the client and control the polling frequency.

## Decision
We decided to implement **Server-Sent Events (SSE)** via Next.js `ReadableStream` (HTTP `text/event-stream`) combined with **Zustand** for global client-side state management.

### Key Implementation Details:
1. **Server-Side Micro-Polling:** The server establishes a 3-second internal loop (`setInterval`) to fetch prices and pushes encoded chunks to the client. It automatically clears the interval on client disconnect (`controller.close`) to prevent memory leaks.
2. **Streaming Headers:** Implemented strict headers (`X-Accel-Buffering: no` and `Transfer-Encoding: chunked`) to prevent Next.js/Vercel or proxy layers from buffering the stream, which previously caused the browser tab to spin indefinitely in a loading state.
3. **Client-Side EventSource:** Replaced traditional `fetch` with native `EventSource` inside the Zustand store to open a single, persistent, one-way highway.

## Consequences
- **Pros:** - Zero third-party dependencies required for streaming (Native `ReadableStream` on server, Native `EventSource` on client).
  - High resource efficiency since the connection is unidirectional (Server-to-Client).
  - Built-in automatic reconnection handled by the browser if the client's network drops.
  - Fully decoupled architecture: The client never talks to third-party APIs directly, securing our keys and respecting rate limits.
- **Cons:**
  - Unidirectional only. If we need to implement interactive features like live trading or two-way instant messaging in the future, we will need to introduce WebSockets or HTTP POST endpoints alongside this stream.