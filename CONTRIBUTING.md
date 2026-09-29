# Contributing

Thanks for helping improve this portfolio repository.

## Ways to Contribute

- Documentation improvements (README, setup, troubleshooting)
- Content updates (projects, experience, links, assets)
- Validation test improvements under root `test/`
- Bug reports and performance observations

## Ground Rules

- Keep application/runtime behavior unchanged unless explicitly requested.
- Prefer focused, minimal diffs.
- Keep tests deterministic and runnable without external services.

## Content Update Guidance

For updates to portfolio entries:

- Edit data files in `client/data/`.
- Ensure referenced local assets exist in `client/public/`.
- Run validation test:
  - from root: `npm --prefix client run test`

## Validation Before PR

From `client/`:

- `npm run lint`
- `npm run build`
- `npm run test`

## Reporting Issues

Use the provided issue templates in `.github/ISSUE_TEMPLATE/`:

- Bug report
- Content update
- Performance report
