# 2. Migrate Package Manager from npm to pnpm

- **Status:** Approved
- **Date:** 2026-06-04
- **Author:** [Your Name]

## Context and Problem Statement
Initially, the project was bootstrapped using `npm` as the default package manager. However, as the multi-tenant SaaS application scales with high-frequency live dependencies (Zustand, Framer Motion, next-pwa, etc.), we need a more deterministic, performant, and secure dependency resolution strategy. 

Moreover, `npm`'s default flat node_modules structure (hoisting) can introduce phantom dependencies, which creates unstable builds on continuous integration (CI) environments.

## Decision Drivers
* **Build Performance:** The real-time nature of this dashboard requires frequent local and CI builds. Speed is critical.
* **Disk Space Efficiency:** Reusing packages across micro-services/tenants via a global content-addressable store.
* **Strict Dependency Management:** Eliminating phantom dependencies before the code base expands.

## Considered Options
1. **npm:** Default, but slow, inefficient with disk space, and prone to hosting issues.
2. **Yarn (Classic/Berry):** Good performance, but setup and zero-installs configuration add unnecessary complexity for this pipeline.
3. **pnpm:** Extremely fast, space-efficient, and enforces a non-flat, strict directory structure.

## Decision Outcome
Chosen option: **pnpm**, because it satisfies all our architectural constraints seamlessly.

### Positive Consequences
* **No Phantom Dependencies:** Developers cannot import unlisted dependencies, making the codebase production-ready and resilient.
* **Speed:** `pnpm` is up to 3x faster than `npm` due to its hard-linking mechanism.
* **Clean Lockfile:** Native alignment with modern Next.js 15 deployment environments.

### Negative Consequences
* Team members/contributors must have `pnpm` installed globally (`corepack enable` or `npm i -g pnpm`).