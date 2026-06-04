# ADR 0007: Transition to Global Ads System

**Status:** Accepted  
**Date:** 2026-06-04

## Context
In the initial architecture, advertisements were scoped to specific tenants (shops). The business requirement has evolved to support a centralized, global advertising system where all shops display the same pool of advertisements.

## Decision
- Removed the `tenantId` foreign key from the `ads` table schema.
- Modified the data fetching logic in the shop page to retrieve all global ads rather than filtering by `tenantId`.
- Implemented `framer-motion` for the AdCarousel component to ensure smooth, hardware-accelerated animations (60fps) suitable for digital signage displays.

## Consequences
- **Positive:** Simplified content management; ads are defined once and reflected across all shop displays.
- **Positive:** Reduced database complexity and removed redundant conditional queries.
- **Negative:** Does not natively support shop-specific advertising without schema modification (this is acceptable as per current requirements).

## Trade-offs
- We chose `framer-motion` over raw CSS transitions to provide better orchestration of entrance/exit animations, which is critical for a high-quality "digital signage" experience.