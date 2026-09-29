# Performance Notes

This document captures optimization-oriented implementation notes visible in the repository and defines a reproducible benchmark process.

## Current Optimization-Oriented Design Notes

Based on existing project documentation and structure:

- The portfolio is designed around a WebGL-first 3D experience with fallback handling.
- Asset usage favors compressed formats (for example AVIF files under `client/public/imgOrIcon`).
- The client stack uses animation and rendering libraries (Three.js, React Three Fiber, Framer Motion, GSAP, Lenis) that require disciplined measurement for real-world performance validation.

## Benchmark Methodology (Recommended)

To produce verifiable numbers, run and record each benchmark with the same environment:

1. Install dependencies and build from `client/`:
   - `npm install`
   - `npm run build`
2. Serve production mode:
   - `npm run start`
3. Measure with:
   - Chrome Lighthouse (Desktop and Mobile presets)
   - Web Vitals in-browser observation (LCP, CLS, INP/TBT proxy checks)
4. Repeat at least 3 runs per profile and record median values.
5. Keep test conditions consistent (device profile, throttling, browser version, network profile).

## Pending Results (Not Yet Recorded Here)

> **Status:** Pending measurement

No canonical benchmark table is committed in this file yet. Add results only after reproducible measurement with the methodology above.

Suggested table format for future updates:

| Profile | Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | TBT/INP proxy |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop | pending | pending | pending | pending | pending | pending | pending | pending |
| Mobile | pending | pending | pending | pending | pending | pending | pending | pending |
