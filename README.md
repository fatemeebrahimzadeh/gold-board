# 🪙 NextGen Smart Gold Board (SaaS / Multi-Tenant Platform)

A high-performance, real-time, and highly customizable Smart Gold & Currency Board tailored for jewelry shops and galleries. Built using **Next.js 15+ (App Router)**, **TypeScript**, and **WebSockets/SSE**, this platform allows individual shop owners to have their own white-labeled live pricing screen, with custom branding, dynamic themes, and integrated local advertisement displays.

---

## ✨ Key Features & Architectural Highlights

- **Multi-Tenant Architecture (White-Labeling):** Dynamic routing (`/[shopSlug]`) fetches specific merchant metadata (names, logos, custom pricing rules) directly on the server (SSR).
- **Dynamic CSS Theme Engine:** Leverages Tailwind CSS coupled with dynamic CSS variables injected at the root layout based on the merchant's branding guidelines.
- **Blazing-Fast Real-time Updates:** Powered by Server-Sent Events (SSE) / WebSockets and managed via **Zustand** to ensure only the price nodes re-render—eliminating screen flickering on large TV displays.
- **Production-Ready PWA:** Fully installable on Android TVs, Smart displays, or tablets, offering an immersive, borderless full-screen experience.
- **Localized Dynamic SEO:** Server-side rendered metadata optimizing local SEO for each participating jewelry gallery automatically.
- **Network Resilience (Offline Handler):** Gracefully handles network drops on smart displays, freezing the last trusted rate and showcasing an elegant "Reconnecting" indicator instead of crashing or showing stale/zeroed data.

---

## 🛠️ Tech Stack & Tooling

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with CSS Custom Properties for runtime theme injection)
- **State Management:** Zustand (Micro-state management for optimal re-render cycles)
- **Animations:** Framer Motion (For fluid price direction shifts and smooth ad transitions)
- **PWA Capabilities:** Next-PWA / Service Workers

---

## 🗺️ 4-Week Development Roadmap & Timeline

### 🏗️ Week 1: Foundation, Theme Engine & Data Modeling
* **Days 1-2:** Project bootstrapping, Tailwind CSS variable configuration, and setup of Server-Side Rendered (SSR) dynamic routes (`/[shopSlug]`) for tenant identification.
* **Days 3-4:** Crafting semantic, high-end UI components tailored for premium displays (Headers, dynamic responsive grids).
* **Days 5-6:** Orchestrating the **Zustand** store to handle high-frequency pricing payloads in the client layer efficiently.

### ⚡ Week 2: Real-time Hydration & Kinetic Typography
* **Days 1-2:** Constructing secure Next.js API Routes to proxy upstream premium gold pricing APIs and safeguard secret API Keys.
* **Days 3-4:** Implementing the real-time data stream (SSE/WebSockets) to feed the Zustand store.
* **Days 5-6:** Integrating **Framer Motion** for price indicator shifts (smooth green/red slide animations when rates tick up or down).

### 📱 Week 3: Dynamic Ad-Network, PWA Manifest & Advanced SEO
* **Days 1-2:** Configuring `next-pwa` and Service Workers to make the application fully standalone and installable on Android-powered TVs.
* **Days 3-4:** Building the smooth-carousel Ad component to loop tenant-specific marketing banners/text tickers.
* **Days 5-6:** Writing dynamic metadata generation logic for robust Local SEO crawlers.

### 🚀 Week 4: Fault Tolerance, Performance Audit & Deployment
* **Days 1-2:** Developing the network interceptor to guarantee screen resilience during internet drops.
* **Days 3-4:** Performance profiling to eliminate potential memory leaks on displays operating 24/7.
* **Days 5-6:** Final deployment to edge servers, environment variable configuration, and documentation.

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev