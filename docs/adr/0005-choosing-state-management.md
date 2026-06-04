# 0003. Choosing State Management Solution

* **Status:** Approved
* **Date:** 2026-06-04
* **Author:** Fateme Ebrahimzadeh

## Context & Problem Statement
The Gold Board application updates prices in real-time via WebSockets (multiple times per second). We need a global state management solution to hold this price data and share it across various UI cards (Gold, Coins, Currencies). The main challenge is performance: high-frequency updates can easily cause massive, application-wide re-renders, causing lag on lower-end display kiosks or mobile devices.

## Decision Drivers
* **Performance (Re-render Control):** Ability to subscribe to specific primitive fields (e.g., only Gold price) without triggering re-renders when other prices update.
* **Boilerplate & DX:** Minimal setup and clean syntax to keep code maintainable.
* **Next.js SSR Compatibility:** Safe to use within Next.js App Router environment without hydration mismatches.

## Considered Options
1. **React Context API:** Native to React, zero external dependencies.
2. **Redux Toolkit (RTK):** Highly robust, industry standard, but very boilerplate-heavy.
3. **Zustand:** Micro-state manager based on hooks, uses pub/sub pattern under the hood.

## Decision Outcome
Chosen option: **Option 3 (Zustand)**

### Why not Option 1 (Context API)?
React Context is notorious for performance issues with high-frequency updates. When a context value changes, **all consumers re-render automatically**. Splitting context into 10 different providers to bypass this would create an unmaintainable "Provider Hell".

### Why not Option 2 (Redux Toolkit)?
While Redux Toolkit (RTK) solves the re-render issue perfectly using selectors (just like Zustand does), it is heavily bloated for this specific use case. RTK requires creating Slices, Actions, Reducers, configuring a global Store, and wrapping the Next.js layout in a Client Component Provider. This introduces high boilerplate, unnecessary complexity, and a larger bundle size without offering any runtime performance advantages over Zustand's lightweight hooks.

### Consequences of choosing Zustand
* **Good:** Native atomic selectors out of the box. A `PriceCard` can subscribe *only* to `state.prices.gold18k` and ignore everything else, bringing re-renders down to absolute zero for unrelated changes.
* **Good:** Zero boilerplate; the entire store is just one clean hook (`usePriceStore`).
* **Good:** Extremely lightweight footprint (around 1.5KB).