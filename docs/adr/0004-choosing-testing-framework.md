# 0004. Choosing Testing Framework and Strategy

* **Status:** Approved
* **Date:** 2026-06-04
* **Author:** Fateme Ebrahimzadeh

## Context & Problem Statement
For the Gold Board application, we handle real-time monetary data (Gold, Currency, and Coin prices) via WebSockets. Incorrect price calculations or UI rendering failures under unstable network conditions can cause severe business issues. We need a robust, fast, and maintainable testing setup to verify UI components, price calculation utilities, and offline PWA behaviors.

## Decision Drivers
* **Execution Speed:** Tests must run fast during local development and pre-commit hooks.
* **Next.js Compatibility:** Seamless integration with App Router and SWC.
* **Network Mocking:** Ability to easily simulate WebSocket streams and offline states.
* **Maintainability:** Writing tests that mimic user behavior rather than internal implementation details.

## Considered Options
1. **Jest + Ts-jest + MSW**
2. **Vitest + React Testing Library + MSW**

## Decision Outcome
Chosen option: **Option 2 (Vitest + RTL + MSW)**

### Consequences
* **Good:** Extremely fast test execution due to Vite's esbuild pipeline. Minimal configuration overhead compared to Jest.
* **Good:** React Testing Library ensures components are tested from the user's perspective, increasing confidence.
* **Good:** MSW allows perfect mocking of REST/WebSocket boundaries for testing PWA offline features.
* **Bad:** Vitest is relatively newer than Jest, though highly stable and officially recommended by modern tooling.