# 3. Configure Progressive Web App (PWA) for TV and Mobile Displays

- **Status:** Approved
- **Date:** 2026-06-04
- **Author:** Fateme Ebrahimzadeh

## Context and Problem Statement
The Smart Gold Board engine is designed to run on diverse hardware, including gold shop TV displays, Android boxes, and client mobile devices. To provide a native-app experience, the application must hide browser chrome (URL bars, navigation buttons), prevent accidental rotary-focus hijacking by the browser, and allow local installation ("Add to Home Screen").

We need to configure a stable Progressive Web App (PWA) lifecycle compatible with Next.js 15 and TypeScript.

## Decision Drivers
* **Immersive UX (Fullscreen):** The board must occupy 100% of the screen estate on TV displays without standard browser borders.
* **Cross-Platform Installability:** Gold merchants should be able to install the dashboard seamlessly on both Android and iOS devices.
* **Modern Next.js 15 Compatibility:** Avoiding deprecated or breaking PWA plugins that crash under React 19 / Next.js 15.

## Considered Options
1. **Standard Web App:** Leaves browser headers visible, ruining the kiosk/hardware display aesthetic.
2. **Legacy `next-pwa` Plugin:** Incompatible with Next.js 15's strict TypeScript types and app router lifecycle.
3. **Modern `@ducanh2912/next-pwa` Wrapper:** Fully supports Next.js 15, dynamic metadata, and automates service worker generation safely.

## Decision Outcome
Chosen option: **`@ducanh2912/next-pwa`**, because it integrates natively with Next.js 15 metadata, allows clean decoupling of obsolete properties like `skipWaiting`, and provides reliable landscape fullscreen behavior for hardware targets.

### Positive Consequences
* **Kiosk Ready:** The app boots directly into fullscreen mode when launched from a TV home screen.
* **Automatic Offline Caching:** Core assets are cached locally via generated service workers.
* **Valid Manifest Mapping:** Linked globally via `layout.tsx` metadata for robust browser discovery.