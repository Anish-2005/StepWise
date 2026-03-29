# Contributing to StepWise

Thanks for contributing to StepWise.
This guide keeps contributions consistent, reviewable, and production-ready.

## Before You Start

1. Check open issues and existing pull requests to avoid duplicate work.
2. Keep changes focused and scoped to a single concern.
3. For non-trivial work, open an issue first to align on approach.

## Development Setup

```bash
npm install
npm run dev
```

Run quality checks before opening a PR:

```bash
npm run lint
npm run build
```

## Branch Naming

Use descriptive branch names:

- `feat/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `refactor/<short-description>`

Examples:

- `feat/weighted-graph-input-validation`
- `fix/playback-edge-case-last-step`

## Commit Messages

Write clear, imperative commit messages.
Prefer Conventional Commit style:

- `feat: add keyboard shortcut for trace generation`
- `fix: prevent invalid heap index execution`
- `docs: rewrite setup section in readme`

## Pull Request Checklist

Before submitting:

1. Ensure lint and build pass locally.
2. Update docs for behavior changes.
3. Include screenshots/gifs for visible UI changes.
4. Add or adjust tests when introducing logic changes.
5. Keep PR description clear:
   - Problem
   - Solution
   - Tradeoffs (if any)
   - Manual test steps

## Coding Standards

- Use TypeScript types explicitly where behavior is non-obvious.
- Prefer small, composable functions.
- Keep UI state predictable; avoid hidden side effects.
- Preserve accessibility:
  - semantic HTML
  - keyboard interaction
  - meaningful labels
- Avoid dead links/placeholders in production-facing UI.

## Algorithm Contribution Guidance

When adding a new algorithm:

1. Add logic in `src/algorithms/`.
2. Return deterministic `Step[]` output for visualization playback.
3. Add UI option in `ControlPanel`.
4. Ensure `InfoPanel` and `Visualizer` behavior remains coherent.
5. Update `README.md` input format/docs if needed.

## Documentation Contributions

Documentation improvements are welcome:

- clarify setup
- improve examples
- fix inaccuracies
- improve architecture explanations

Keep docs aligned with actual runtime behavior.

## Security

If you find a security issue, do not open a public issue with exploit details.
Share a minimal report with maintainers privately first.

