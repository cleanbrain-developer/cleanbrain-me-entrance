# cleanbrain-me-entrance

Landing page for the `cleanbrain.me` root domain — a service directory that lists the services running under `cleanbrain.me` and links out to each of them. It is not a reverse proxy or gateway.

Project context (purpose, architecture, current status) lives in the repository itself, not in this file:

- [`PROJECT.yaml`](PROJECT.yaml) — structured identity and current phase
- [`docs/product/`](docs/product/) — problem, users, goals, scope
- [`docs/architecture/`](docs/architecture/) — structure and boundaries
- [`docs/decisions/`](docs/decisions/) — accepted architecture decisions
- [`docs/status/current-state.md`](docs/status/current-state.md) — current progress and next work
- [`CLAUDE.md`](CLAUDE.md) / [`AGENTS.md`](AGENTS.md) — agent bootstrap entry points

## Stack

Vue 3 + TypeScript + Vite. No router or state library — this is a single static page.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Service metadata

Service metadata is managed in [`src/config/services.ts`](src/config/services.ts), separate from UI components — see `docs/architecture/overview.md`.

## Status

MVP implemented and verified (typecheck, build). Deployment integration with `cleanbrain-me-infra` has not started — see `docs/status/current-state.md` for what's next.
