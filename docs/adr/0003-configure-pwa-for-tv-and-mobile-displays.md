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



---



# Remove PWA Plugin Integration

- **Status:** Approved
- **Date:** 2026-06-06
- **Author:** [Your Name]

## Context and Problem Statement
The project initially experimented with a PWA setup using `@ducanh2912/next-pwa`, but the integration created friction with the Next.js 16 + Turbopack build flow and required extra registration plumbing. The result was a brittle developer experience with more maintenance cost than product value.

We want the app to stay focused on the real-time board experience without carrying a service worker stack that is not yet providing clear business value.

## Decision Drivers
* **Build Stability:** Reduce config coupling between the app and webpack-era PWA tooling.
* **Developer Experience:** Avoid manual service worker registration and plugin-specific debugging.
* **Maintainability:** Keep the Next.js config minimal and aligned with the current build system.

## Considered Options
1. **Keep `@ducanh2912/next-pwa`:** Works in principle, but adds configuration complexity and build warnings.
2. **Migrate to another PWA stack:** Possible, but still adds service worker complexity that is not essential right now.
3. **Remove PWA integration entirely:** Simplest and most stable for the current product scope.

## Decision Outcome
Chosen option: **Remove PWA integration entirely**, because the app does not currently need offline-first behavior badly enough to justify the extra build and runtime complexity.

### Positive Consequences
* **Simpler build pipeline:** Fewer config hooks and fewer moving parts.
* **Less maintenance:** No service worker lifecycle or manifest registration debugging.
* **Better alignment:** The app stays focused on live pricing and streaming behavior.

### Negative Consequences
* **No offline app shell:** Users cannot rely on cached app behavior from a service worker.
* **No installable PWA flow:** The browser will not treat the site as a fully managed PWA experience.

---

# Reintroduce Lightweight Offline Support

- **Status:** Approved
- **Date:** 2026-06-06
- **Author:** [Your Name]

## Context and Problem Statement
The board should still provide a useful experience when connectivity drops. Users should see the last cached price snapshot, and if no snapshot exists they should land on an explicit offline screen instead of a broken blank page.

We want that behavior without bringing back the heavyweight PWA plugin stack that caused build friction earlier.

## Decision Drivers
* **Graceful Offline UX:** Show cached pricing data when available.
* **Simple Runtime:** Avoid webpack-era PWA plugins and keep the build config minimal.
* **Predictable Fallbacks:** Show a dedicated offline page when no cached data exists.

## Considered Options
1. **No offline support:** Simplest, but poor UX when the network drops.
2. **Re-enable `next-pwa`:** Provides offline features, but reintroduces the build issues we already saw.
3. **Custom lightweight offline support:** Use a small service worker, cache the shell, and persist the latest prices locally.

## Decision Outcome
Chosen option: **Custom lightweight offline support**, because it gives the app a usable offline mode without the plugin dependency and build complexity.

### Positive Consequences
* **Cached data fallback:** Users can still see the latest saved prices offline.
* **Clear offline state:** The app can show an explicit offline message when no cached data exists.
* **Lower maintenance burden:** No heavy PWA plugin or generated registration path.

### Negative Consequences
* **Not a full offline-first app:** Real-time updates still depend on connectivity.
* **Custom caching logic:** We own the service worker and snapshot persistence behavior ourselves.
