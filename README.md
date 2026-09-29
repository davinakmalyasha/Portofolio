# Portofolio — Interactive 3D/2D Developer Portfolio

Personal portfolio project built with Next.js and React, featuring an interactive 3D experience with a 2D fallback for devices or browsers where WebGL is unavailable.

- **Live demo:** https://www.portofoliodavin.vercel.app
- **Repository:** https://github.com/davinakmalyasha/Portofolio

<img width="960" height="475" alt="Portfolio screenshot" src="https://github.com/user-attachments/assets/2d790d83-4c12-40e9-9f4a-412430c54071" />
<img width="960" height="475" alt="Portfolio screenshot" src="https://github.com/user-attachments/assets/3d1f2d91-991b-425b-a68a-41201d67783f" />

## Key Features

- Interactive **3D mode** for desktop-grade WebGL-capable environments
- Automatic/manual **2D fallback mode** for broader compatibility
- Responsive behavior with WebGL capability handling and graceful degradation
- Portfolio sections for **projects**, **experience**, certificates, and contact pathways
- Data-driven content under `client/data` for project and experience entries

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **3D:** Three.js, React Three Fiber, @react-three/drei
- **Animation/Scroll:** GSAP, Lenis
- **Language:** TypeScript
- **Deployment:** Vercel

## Repository Structure

```text
.
├─ README.md
├─ PERFORMANCE.md
├─ CONTRIBUTING.md
├─ SECURITY.md
├─ CHANGELOG.md
├─ test/
│  └─ portfolio-validation.test.mjs
├─ .github/
│  ├─ ISSUE_TEMPLATE/
│  └─ PULL_REQUEST_TEMPLATE.md
└─ client/
   ├─ app/
   ├─ components/
   ├─ data/
   ├─ hooks/
   ├─ public/
   ├─ types/
   ├─ utils/
   └─ package.json
```

## Setup & Development

From the repository root:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Verification

From `client/`:

```bash
npm run lint
npm run build
npm run start
```

## Testing

A lightweight, deterministic validation script is provided at `test/portfolio-validation.test.mjs`.

From repository root:

```bash
npm --prefix client run test
```

From `client/`:

```bash
npm run test
```

The test validates:

- required portfolio data files exist
- project and experience entries include required fields
- local image references in portfolio data resolve to files under `client/public`
- project/demo URLs are syntactically valid (`http/https`)
- expected client scripts are present in `client/package.json`

## Performance

Performance optimizations and benchmarking notes are documented in [PERFORMANCE.md](./PERFORMANCE.md).

> Lighthouse values are intentionally not presented here as “verified” unless measured and recorded. See the benchmark methodology and pending-results section in `PERFORMANCE.md`.

## Contribution & Reporting

- Contribution flow: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Security reporting: [SECURITY.md](./SECURITY.md)
- Issue templates: `.github/ISSUE_TEMPLATE/`

For content corrections (project/experience text, links, assets), open an issue with the **Content update** template.
