# Current State

Last updated: 2026-09-09

## Current phase

Deployed — `https://cleanbrain.me` is live in production, serving the MVP. CI auto-deploy (`ENABLE_PRODUCTION_DEPLOY`) is not yet enabled; the current production Pod was rolled out manually during first-time deployment.

## Completed

- Chose the project name `cleanbrain-me-entrance` and scaffolded a Vue 3 + TypeScript + Vite project (no router, no state library — single page).
- Adopted a repository-first context structure by following `agent-dev-starter`'s adoption guide in "New project" mode: `PROJECT.yaml`, `.ai/constitution/`, `docs/product/`, `docs/architecture/`, `docs/decisions/ADR-0001-repository-first-context.md`, `AGENTS.md`, `CLAUDE.md`, and this file — before implementing application code.
- Recorded ADR-0001 (repository-first context) as accepted, with `cleanbrain.developer` as decider.
- Reviewed and confirmed `.ai/constitution/` with the maintainer.
- Implemented the Entrance MVP: `Service` type (`src/types/service.ts`), the initial service list (`src/config/services.ts`) with `english-core-speaking` (active) and `developer` (planned), `ServiceCard.vue`/`ServiceGrid.vue`, and the `App.vue` shell with light/dark styling via `prefers-color-scheme`.
- Verified `vue-tsc -b` (typecheck) and `npm run build` both pass.
- Ran the bootstrap acceptance test in a fresh, isolated agent session starting only from `CLAUDE.md` — all five acceptance questions in `docs/product/goals.md` were answered correctly with repository-path citations and no gaps or guesses.
- Initialized git locally, committed the foundation + MVP, created the public GitHub repository `cleanbrain-developer/cleanbrain-me-entrance`, and pushed to `main`.
- Added `Dockerfile`, `nginx.conf`, `.dockerignore`, and `.github/workflows/deploy.yml` (test → build/push GHCR → SSH deploy, gated by `ENABLE_PRODUCTION_DEPLOY`), matching the `english-core-speaking` / `kioti-crm-discount-enhance-demo` CI/CD model. Verified buildable via a real GitHub Actions run.
- Confirmed the GHCR package (`ghcr.io/cleanbrain-developer/cleanbrain-me-entrance`) is public — no `imagePullSecrets` needed.
- Set `HETZNER_SSH_HOST`/`USER`/`PORT`/`PRIVATE_KEY`/`KNOWN_HOSTS` GitHub Actions secrets on this repo, reusing `english-core-speaking`'s existing CI SSH keypair (same server, same `deploy` Linux account).
- `cleanbrain-me-infra`: added `kubernetes/namespaces/cleanbrain-me-entrance.yaml` and `kubernetes/apps/entrance/{rbac,deployment,service,httproute}.yaml`.
- Confirmed the apex `cleanbrain.me` A record already existed (DNS was not a blocker).
- Discovered the live Gateway's TLS mechanism is cert-manager's Gateway API integration ("Gateway Shim": a `Certificate` is auto-issued per HTTPS listener, owned by the Gateway) rather than a manually-applied `Certificate` object. Added a new `entrance-https` listener (hostname `cleanbrain.me`, `certificateRefs: [cleanbrain-me-entrance-tls]`) to the live `cleanbrain-me-gateway` Gateway; cert-manager auto-issued and the certificate is `Ready`.
- Applied `namespace` → `rbac` → `deployment` → `service` → `httproute` to the live cluster as cluster administrator. `pod/web` is `Running 1/1`, `httproute/entrance` shows `Accepted: True` / `ResolvedRefs: True`.
- **Verified end to end**: `curl -I https://cleanbrain.me` returns `HTTP/2 200` (nginx/1.27.5). The service directory is live in production.

## In progress

- None currently. See Next.

## Next

1. Set up the CI ServiceAccount token and merge this app's context into `/home/deploy/.kube/config` on the deploy host (third application sharing that file — see `cleanbrain-me-infra` README "Multi-application kubeconfig on the deploy host").
2. Verify the scoped `ci-deployer` identity's `kubectl auth can-i` checks (allowed: `get`/`patch` on `deployment/web`; denied: `secrets`, cross-namespace) before enabling CI deploys.
3. Set `ENABLE_PRODUCTION_DEPLOY=true` as a repository variable, then push (or re-run) to confirm a real CI-driven deploy (`kubectl set image` + `rollout status`) succeeds end to end.
4. Add real `developer.cleanbrain.me` service entry once that project exists (currently `planned` placeholder in `src/config/services.ts`).

## Open decisions

- The `external` field on `Service` has no defined behavior yet (see `docs/product/scope.md`).
- No threshold has been set for when service categorization becomes necessary (see `docs/product/goals.md`).
- `kioti-crm-discount`'s TLS/HTTPS listener was found to be missing from the live Gateway during this work (unrelated to entrance, noted in `cleanbrain-me-infra`'s README) — not this repository's concern, but flagged for awareness.

## Known constraints

- No backend, database, or authentication by design (see `docs/product/scope.md`).
- Target cluster is 2 vCPU / 4 GB RAM / 40 GB disk (per `cleanbrain-me-infra`) — the combined CPU limit across all services now exceeds the box's vCPU count (ceiling, not reservation — see that repo's "Resource budget"), so stay lightweight.
- This repository owns application source, Dockerfile, and CI; `cleanbrain-me-infra` owns the production Kubernetes manifest — the two must not duplicate each other's content.
- The CI deployment identity (`ci-deployer` in `cleanbrain-me-entrance` namespace) follows the same least-privilege model as `english-core-speaking`'s — a separate RBAC identity, not a widened shared one.

## Exit criteria for this phase

- A fresh agent session, given only `AGENTS.md` or `CLAUDE.md`, correctly answers the five acceptance questions in `docs/product/goals.md`, each traceable to a repository path. (Met.)
- The foundation and MVP are committed as a reviewable baseline. (Met.)
- Dockerfile and CI workflow exist in this repository and have been verified to build successfully via GitHub Actions. (Met.)
- The corresponding `cleanbrain-me-infra` manifest exists and the service is reachable at `https://cleanbrain.me`. (Met.)
- CI-driven deploys (`ENABLE_PRODUCTION_DEPLOY=true`) are verified working end to end. (Not yet met — see Next.)
