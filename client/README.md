# Client App (Next.js)

This directory contains the portfolio web application.

## Scripts

Run from this `client/` directory:

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
npm run test
```

## Notes

- App source lives in `app/`, `components/`, `hooks/`, `utils/`, and `types/`.
- Portfolio content entries are managed in `data/`.
- Static assets are in `public/`.
- Root-level validation tests are executed via `npm run test` (`node ../test/portfolio-validation.test.mjs`).
