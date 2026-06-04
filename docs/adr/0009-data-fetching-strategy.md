## 0009: Data Fetching and Offline-First Persistence Strategy

**Date:** 2026-06-04

### Decision
- **Fetching:** We will use `TanStack Query` for all server-side data fetching. This allows for unified state management and automatic background synchronization.
- **Persistence:** We will implement `createSyncStoragePersister` to persist the `TanStack Query` cache into `localStorage`. 
- **Reasoning:** By persisting the cache, the application will achieve an "Offline-First" experience. The digital signage board will instantly render the last known advertisements from `localStorage` upon page load or network recovery, before checking for fresher data from the server.
- **Implementation:** Using native `Persister` handles serialization, cache invalidation, and data hydration automatically, preventing the bugs associated with manual `localStorage` management.

### Consequences
- **Positive:** Improved perceived performance; consistent UI even during network instability.
- **Positive:** Automatic handling of stale vs. fresh data via TanStack Query's internal logic.
- **Negative:** Increased browser storage footprint (minimal).