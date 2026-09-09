# Current State

Last updated: 2026-09-09

## Current phase

MVP Implemented — the standalone frontend is built and verified. Deployment integration with `cleanbrain-me-infra` has not started, and the foundation has not been committed to git yet.

## Completed

- Chose the project name `cleanbrain-me-entrance` and scaffolded a Vue 3 + TypeScript + Vite project (no router, no state library — single page).
- Adopted a repository-first context structure by following `agent-dev-starter`'s adoption guide in "New project" mode: `PROJECT.yaml`, `.ai/constitution/`, `docs/product/`, `docs/architecture/`, `docs/decisions/ADR-0001-repository-first-context.md`, `AGENTS.md`, `CLAUDE.md`, and this file — before implementing application code.
- Recorded ADR-0001 (repository-first context) as accepted, with `cleanbrain.developer` as decider.
- Reviewed and confirmed `.ai/constitution/` with the maintainer.
- Implemented the Entrance MVP: `Service` type (`src/types/service.ts`), the initial service list (`src/config/services.ts`) with `english-core-speaking` (active) and `developer` (planned), `ServiceCard.vue`/`ServiceGrid.vue`, and the `App.vue` shell with light/dark styling via `prefers-color-scheme`.
- Verified `vue-tsc -b` (typecheck) and `npm run build` both pass; smoke-tested `npm run dev` by curling the served HTML (no browser/screenshot tool was available in this environment to visually confirm rendering).
- Updated `PROJECT.yaml` (`lifecycle: early-development`, `delivery.implementation_present: true`, `current_phase: mvp-implemented`) and `README.md` to reflect the implemented state.

## In progress

- None currently. See Next.

## Next

1. Run the bootstrap acceptance test in a fresh session (see `docs/architecture/agent-context-model.md`) before committing.
2. Get the maintainer's explicit confirmation, then initialize git locally and commit the foundation + MVP as a reviewable baseline.
3. Get separate, explicit confirmation before creating a GitHub remote and pushing.
4. Add a Dockerfile and CI workflow to this repository (source/build ownership stays here per `cleanbrain-me-infra`'s CLAUDE.md).
5. Coordinate with `cleanbrain-me-infra` to add the Kubernetes manifest for this service: namespace `cleanbrain-me-entrance`, a `Deployment`/`Service`, and an `HTTPRoute` attaching to the existing shared Gateway.
6. Resolve whether the `cleanbrain.me` root domain routes to this service under the existing Gateway/HTTPRoute setup, or needs new Gateway-level configuration.

## Open decisions

- The `external` field on `Service` has no defined behavior yet (see `docs/product/scope.md`).
- Whether the `cleanbrain.me` root domain can be routed under the existing shared Gateway without new `cleanbrain-me-infra` configuration has not been verified (see `docs/architecture/overview.md`).
- No threshold has been set for when service categorization becomes necessary (see `docs/product/goals.md`).

## Known constraints

- No backend, database, or authentication by design (see `docs/product/scope.md`).
- Target cluster is 2 vCPU / 4 GB RAM / 40 GB disk (per `cleanbrain-me-infra`) — deployment must stay a lightweight static bundle in a small container.
- This repository owns application source, Dockerfile, and CI; `cleanbrain-me-infra` owns the production Kubernetes manifest — the two must not duplicate each other's content.
- No git repository exists yet for this project (deleted and restarted from scratch under the new name; see the adoption feedback log for why).

## Exit criteria for this phase

- A fresh agent session, given only `AGENTS.md` or `CLAUDE.md`, correctly answers the five acceptance questions in `docs/product/goals.md`, each traceable to a repository path.
- The foundation and MVP are committed as a reviewable baseline.
- Dockerfile, CI workflow, and the corresponding `cleanbrain-me-infra` manifest exist and the service is reachable at `https://cleanbrain.me`.
