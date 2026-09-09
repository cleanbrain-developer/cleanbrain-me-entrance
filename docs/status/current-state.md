# Current State

Last updated: 2026-09-09

## Current phase

MVP Implemented, Deployment Pending — the standalone frontend, Dockerfile, and CI workflow are in place and pushed to GitHub. Kubernetes deployment integration with `cleanbrain-me-infra` has not started.

## Completed

- Chose the project name `cleanbrain-me-entrance` and scaffolded a Vue 3 + TypeScript + Vite project (no router, no state library — single page).
- Adopted a repository-first context structure by following `agent-dev-starter`'s adoption guide in "New project" mode: `PROJECT.yaml`, `.ai/constitution/`, `docs/product/`, `docs/architecture/`, `docs/decisions/ADR-0001-repository-first-context.md`, `AGENTS.md`, `CLAUDE.md`, and this file — before implementing application code.
- Recorded ADR-0001 (repository-first context) as accepted, with `cleanbrain.developer` as decider.
- Reviewed and confirmed `.ai/constitution/` with the maintainer.
- Implemented the Entrance MVP: `Service` type (`src/types/service.ts`), the initial service list (`src/config/services.ts`) with `english-core-speaking` (active) and `developer` (planned), `ServiceCard.vue`/`ServiceGrid.vue`, and the `App.vue` shell with light/dark styling via `prefers-color-scheme`.
- Verified `vue-tsc -b` (typecheck) and `npm run build` both pass; smoke-tested `npm run dev` by curling the served HTML (no browser/screenshot tool was available in this environment to visually confirm rendering).
- Ran the bootstrap acceptance test in a fresh, isolated agent session starting only from `CLAUDE.md` — all five acceptance questions in `docs/product/goals.md` were answered correctly with repository-path citations and no gaps or guesses.
- Initialized git locally, committed the foundation + MVP, created the public GitHub repository `cleanbrain-developer/cleanbrain-me-entrance`, and pushed to `main` — each step confirmed separately by the maintainer beforehand.
- Added `Dockerfile` (Node build stage → `nginx:1.27-alpine` runtime, matching `english-core-speaking/apps/web`'s pattern) and `nginx.conf` (SPA fallback + asset caching), plus `.dockerignore`.
- Added `npm run typecheck` (`vue-tsc -b --noEmit`) as a standalone script, separate from `build`.
- Added `.github/workflows/deploy.yml` following the `english-core-speaking` / `kioti-crm-discount-enhance-demo` CI/CD model: test (typecheck + build) → build/push single `web` image to GHCR (SHA + `latest` tags) → SSH to Hetzner → `kubectl set image deployment/web` → `rollout status`, gated by the `ENABLE_PRODUCTION_DEPLOY` repository variable and serialized with a `concurrency` group.

## In progress

- None currently. See Next.

## Next

1. Local Docker daemon was not running in this environment, so the `Dockerfile` build was **not** verified locally — only reviewed against `english-core-speaking`'s working equivalent. Verify it builds (`docker build .`) before relying on it, or let the first CI run be the verification.
2. Configure this new GitHub repository's Actions secrets/variables (`HETZNER_SSH_HOST`, `HETZNER_SSH_USER`, `HETZNER_SSH_PRIVATE_KEY`, `HETZNER_SSH_PORT`, `HETZNER_SSH_KNOWN_HOSTS`; `ENABLE_PRODUCTION_DEPLOY` left unset until bootstrap) — same values as `english-core-speaking`'s per `cleanbrain-me-infra`'s README, since it's the same server.
3. Coordinate with `cleanbrain-me-infra` to add this service's manifests: namespace `cleanbrain-me-entrance`, `rbac.yaml` (scoped `ci-deployer` ServiceAccount/Role/RoleBinding limited to `get`/`patch` on `deployment/web` and `list`/`watch` on Deployments in-namespace, mirroring `english-core-speaking`'s), `deployment.yaml`/`service.yaml` for `web`, and `httproute.yaml`.
4. Resolve whether the `cleanbrain.me` root domain (not a subdomain) routes to this service under the existing shared Gateway/HTTPRoute setup, or needs new Gateway-level configuration — this blocks deployment specifically, not the CI pipeline itself.
5. Follow `cleanbrain-me-infra`'s "First-time deployment" pattern: bootstrap the namespace/RBAC/Deployment/Service/HTTPRoute manually as cluster admin first, confirm the `:latest` image exists in GHCR, then flip `ENABLE_PRODUCTION_DEPLOY` to `"true"` for this repo.
6. Once deployed, verify per `cleanbrain-me-infra`'s "Deployment verification" pattern (pods/svc, HTTPRoute `Accepted`/`ResolvedRefs`, external `curl`, browser check).

## Open decisions

- The `external` field on `Service` has no defined behavior yet (see `docs/product/scope.md`).
- Whether the `cleanbrain.me` root domain can be routed under the existing shared Gateway without new `cleanbrain-me-infra` configuration has not been verified (see `docs/architecture/overview.md`).
- No threshold has been set for when service categorization becomes necessary (see `docs/product/goals.md`).
- Whether the GHCR package `ghcr.io/cleanbrain-developer/cleanbrain-me-entrance` should be public (like `english-core-speaking`'s, avoiding `imagePullSecrets`) or private has not been explicitly decided — the repository is public, so public is assumed by default but not yet confirmed against actual GHCR package visibility settings.

## Known constraints

- No backend, database, or authentication by design (see `docs/product/scope.md`).
- Target cluster is 2 vCPU / 4 GB RAM / 40 GB disk (per `cleanbrain-me-infra`) — deployment must stay a lightweight static bundle in a small container. Adding this service's resource requests/limits to `cleanbrain-me-infra`'s resource budget table is part of the manifest work in Next.
- This repository owns application source, Dockerfile, and CI; `cleanbrain-me-infra` owns the production Kubernetes manifest — the two must not duplicate each other's content.
- The CI deployment identity must follow the same least-privilege model as `english-core-speaking`'s `ci-deployer` (namespace-scoped Role, no `ClusterRole`, no `Secrets`/`Pods`/`create`/`delete` access) — per `cleanbrain-me-infra`'s CLAUDE.md, this must be a new, separate RBAC identity, not a widened `english-core-speaking` one.

## Exit criteria for this phase

- A fresh agent session, given only `AGENTS.md` or `CLAUDE.md`, correctly answers the five acceptance questions in `docs/product/goals.md`, each traceable to a repository path. (Met — see Completed.)
- The foundation and MVP are committed as a reviewable baseline. (Met.)
- Dockerfile and CI workflow exist in this repository. (Met, pending local Docker verification.)
- The corresponding `cleanbrain-me-infra` manifest exists and the service is reachable at `https://cleanbrain.me`. (Not yet met.)
