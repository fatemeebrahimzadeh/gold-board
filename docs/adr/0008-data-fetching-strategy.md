# ADR 003: Data Fetching and State Management Strategy

**Status:** Accepted
**Date:** 2026-06-04

## Context
The application requires a highly resilient data-fetching layer for digital signage. It must handle potential network instability while ensuring low latency and real-time updates for shop advertisements and gold prices.

## Decision
- **TanStack Query (React Query):** Integrated for all client-side data management.
- **Hybrid Fetching Pattern:** - Initial data is fetched on the server (Server Components) and passed to `useQuery` via `initialData`. This ensures instantaneous UI rendering on page load.
    - Subsequent updates and background refetching are handled by `useQuery` to maintain data freshness without page reloads.
- **API Routes:** A dedicated `/api/ads` endpoint was implemented to serve data requests, acting as a clean abstraction layer between the client and the database.

## Consequences
- **Positive:** Seamless user experience (no empty loading states on initial load).
- **Positive:** Improved system resilience; cached data is automatically displayed if the network drops.
- **Positive:** Centralized data-fetching logic makes it easier to implement future real-time features (like SSE for gold prices).
- **Negative:** Increased initial complexity due to the hybrid approach.

## Next Steps
- Implement SSE (Server-Sent Events) for live gold price updates to complete the real-time data layer.