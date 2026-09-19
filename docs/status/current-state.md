# Current State

Last updated: 2026-09-20

## Current phase

Deployed, CI-driven — `https://cleanbrain.me` is live in production, and a normal push to `main` now deploys automatically end to end (verified). This phase's original exit criteria are all met; the next phase is ordinary feature work.

## Completed

- Chose the project name `cleanbrain-me-entrance` and scaffolded a Vue 3 + TypeScript + Vite project (no router, no state library — single page).
- Adopted a repository-first context structure by following `agent-dev-starter`'s adoption guide in "New project" mode: `PROJECT.yaml`, `.ai/constitution/`, `docs/product/`, `docs/architecture/`, `docs/decisions/ADR-0001-repository-first-context.md`, `AGENTS.md`, `CLAUDE.md`, and this file — before implementing application code.
- Recorded ADR-0001 (repository-first context) as accepted, with `cleanbrain.developer` as decider.
- Reviewed and confirmed `.ai/constitution/` with the maintainer.
- Implemented the Entrance MVP: `Service` type (`src/types/service.ts`), the initial service list (`src/config/services.ts`) with `english-core-speaking` (active) and `developer` (planned), `ServiceCard.vue`/`ServiceGrid.vue`, and the `App.vue` shell with light/dark styling via `prefers-color-scheme`.
- Verified `vue-tsc -b` (typecheck) and `npm run build` both pass.
- Ran the bootstrap acceptance test in a fresh, isolated agent session starting only from `CLAUDE.md` — all five acceptance questions in `docs/product/goals.md` were answered correctly with repository-path citations and no gaps or guesses.
- Initialized git locally, committed the foundation + MVP, created the public GitHub repository `cleanbrain-developer/cleanbrain-me-entrance`, and pushed to `main`.
- Added `Dockerfile`, `nginx.conf`, `.dockerignore`, and `.github/workflows/deploy.yml` (test → build/push GHCR → SSH deploy, gated by `ENABLE_PRODUCTION_DEPLOY`), matching the `english-core-speaking` / `kioti-crm-discount-enhance-demo` CI/CD model.
- Confirmed the GHCR package (`ghcr.io/cleanbrain-developer/cleanbrain-me-entrance`) is public — no `imagePullSecrets` needed.
- Set `HETZNER_SSH_HOST`/`USER`/`PORT`/`PRIVATE_KEY`/`KNOWN_HOSTS` GitHub Actions secrets on this repo, reusing `english-core-speaking`'s existing CI SSH keypair (same server, same `deploy` Linux account).
- `cleanbrain-me-infra`: added `kubernetes/namespaces/cleanbrain-me-entrance.yaml` and `kubernetes/apps/entrance/{rbac,deployment,service,httproute}.yaml`.
- Confirmed the apex `cleanbrain.me` A record already existed (DNS was not a blocker).
- Discovered the live Gateway's TLS mechanism is cert-manager's Gateway API integration ("Gateway Shim": a `Certificate` is auto-issued per HTTPS listener, owned by the Gateway) rather than a manually-applied `Certificate` object. Added a new `entrance-https` listener (hostname `cleanbrain.me`, `certificateRefs: [cleanbrain-me-entrance-tls]`) to the live `cleanbrain-me-gateway` Gateway; cert-manager auto-issued and the certificate is `Ready`.
- Applied `namespace` → `rbac` → `deployment` → `service` → `httproute` to the live cluster as cluster administrator. `pod/web` `Running 1/1`, `httproute/entrance` `Accepted: True` / `ResolvedRefs: True`.
- Created the third-application CI ServiceAccount token (`ci-deployer-cleanbrain-me-entrance-token`) and merged its context into `/home/deploy/.kube/config` alongside `english-core-speaking`'s, without disturbing the existing `current-context`. Verified: `kubectl auth whoami` → `system:serviceaccount:cleanbrain-me-entrance:ci-deployer`; `can-i patch deployment/web` → `yes`; `can-i get secrets` → `no`.
- Set `ENABLE_PRODUCTION_DEPLOY=true` and triggered a real workflow run (`34362967974`): `test` → `build-and-push` → `deploy` all succeeded, meaning CI's SSH → `kubectl set image` → `rollout status` path is confirmed working end to end, not just theoretically wired up.
- **Verified end to end, twice**: `curl -I https://cleanbrain.me` returns `HTTP/2 200` both before and after the CI-driven deploy. The service directory is live in production with a working CI/CD pipeline.
- Removed the `developer` placeholder from `src/config/services.ts` — that project hasn't started, and a `planned` entry for a nonexistent service was misleading on a live production page. Only `english-core-speaking` is listed now.
- Added `category` to the `Service` shape's data and grouping behavior in the UI: `ServiceGrid.vue` now sections services by `category` (first-seen order) with a heading per section, always shown — including today's single `"Learning"` category (`english-core-speaking`) — so the layout doesn't change shape as more categories are added later.
- UI/UX polish: hover elevation (shadow, not just a border color change) on cards, `:focus-visible` outline for keyboard navigation, and dark-mode-aware CSS variables for status badge colors (previously hardcoded light-mode hex values with weak dark-mode contrast).
- Added a real `developer` entry to `src/config/services.ts` (`https://developer.cleanbrain.me`, category `"Portfolio"`, status `active`) now that `cleanbrain-me-developer` is actually live in production with a working CI/CD pipeline — not a `planned` placeholder this time, per the decision recorded below when the earlier placeholder was removed. `ServiceGrid.vue` now renders two category sections (`Portfolio`, `Learning`). Verified: `vue-tsc -b`/`npm run build` pass, and a real browser screenshot confirms the card renders correctly and its link resolves to `https://developer.cleanbrain.me/`.
- Added browser-locale-based internationalization: `src/i18n/locale.ts` (`detectLocale()` from `navigator.languages`, Korean vs. English fallback), `src/i18n/strings.ts` (UI chrome strings), and `Service.descriptionEn` (optional per-service English description, falling back to the Korean `description`). `App.vue` sets `document.documentElement.lang` and the meta description on mount. Verified with a headless-browser check (Playwright, temporary — not added as a project dependency) across three `context.locale` values: `ko-KR` renders Korean, `en-US` and `ja-JP` (non-Korean) both render English — confirmed via both DOM text assertions and screenshots.
- Fixed category ordering in `ServiceGrid.vue`: it previously sorted by first-seen order in `services.ts` (an implementation detail, not a deliberate choice), which put `Portfolio` before `Learning` even though the maintainer expected alphabetical order. Now sorts category names with `localeCompare` — `Learning` before `Portfolio`, and this stays correct regardless of the order services are added to the config.
- Ran a full review pass (code review + real screenshots across desktop/mobile, light/dark, ko/en, via a temporary Playwright + axe-core check against production) and fixed what it found: (1) `.visitor-count`'s `opacity: 0.8` on top of `--text-secondary` failed WCAG AA contrast (axe `serious` violation) — removed; (2) the visitor-count text was appended inline to the header `.subtitle` paragraph, which wrapped awkwardly on mobile (an orphaned lone digit on its own line) — moved to its own `<p class="visitor-count">` block; (3) `index.html` had no Open Graph/Twitter Card meta tags, so sharing the bare `cleanbrain.me` link (Slack, KakaoTalk, etc.) showed no title/description/image preview — added static Korean-default `og:*`/`twitter:*` tags (can't be per-visitor-locale without SSR, which this app deliberately doesn't have) plus `theme-color`; (4) `ServiceCard.vue`'s service-name heading was `<h2>`, colliding with `ServiceGrid.vue`'s category-section `<h2>` it's nested inside — changed to `<h3>`, verified `H1 > H2 > H3` in the actual DOM afterward; (5) external service links (`target="_blank"`) gave no accessible indication they open a new tab — added a visually-hidden `(opens in a new tab)`/`(새 탭에서 열림)` string via a new `.sr-only` utility class in `style.css`; (6) the `"General"`/uncategorized category fallback label was hardcoded English regardless of locale — moved into `strings.ts` as `uncategorized`. Re-ran axe-core after: 0 violations (down from 1).

- Added a manual KO/EN toggle in the header, per the maintainer's decision on the deferred item above. `locale` became a `ref<Locale>` instead of a plain constant, seeded from a stored choice (`loadStoredLocale()`) falling back to `detectLocale()`, so the default behavior (Korean in Korea, English elsewhere) is unchanged for a first-time visitor. Clicking KO/EN calls `setLocale()`, which updates the ref (everything downstream reacts through the existing `:locale` prop chain) and persists the choice to `localStorage` via `storeLocale()` so it's remembered on the next visit — wrapped defensively since storage access can throw. Verified with Playwright (temporary, not a project dependency): a `ko-KR` visitor defaults to Korean, toggling to EN updates the DOM immediately (`lang`, subtitle, card action text) and survives a page reload; an `en-US` visitor defaults to English and can toggle back to KO; axe-core showed 0 violations on the toggled state.
- Added a `.ko.md` Korean companion for every Markdown document in this repository (2026-09-17), per the maintainer's ADR-0004/ADR-0005 decision in `agent-dev-starter` (bilingual documentation, mandatory and cascading). `PROJECT.yaml` is excluded per that decision. English remains canonical; agent bootstrap continues to read only the English files.
- Copied `scripts/check-ko-companions.sh` from `agent-dev-starter` and added a step to `.github/workflows/deploy.yml`'s `test` job that runs it with `--missing-only` and fails the build on a missing `.ko.md` companion, per `agent-dev-starter`'s `ADR-0009` (2026-09-18).
- Retrofitted `agent-dev-starter`'s V2 migration onto open standards (`ADR-0010` through `ADR-0013` in `agent-dev-starter`), 2026-09-20:
  - `CLAUDE.md`/`CLAUDE.ko.md` removed. `AGENTS.md` is now the sole agent adapter, since Claude Code reads `AGENTS.md` natively (v2.1.277) and there was no remaining reason to keep two adapters in sync (`ADR-0011`).
  - `.ai/constitution/agent-behavior.md`/`.ko.md` merged directly into `AGENTS.md` and removed.
  - `.ai/constitution/engineering-principles.md`/`.ko.md` merged into a new `.specify/memory/constitution.md`/`.ko.md` (GitHub Spec Kit's own constitution role) and removed, including this project's own "Config over code for service metadata" and "Separated boundaries" principles (`ADR-0013`). `.ai/constitution/documentation-policy.md` is unaffected in role, only its "Single responsibility" list was updated to point at the new file locations.
  - `PROJECT.yaml`: `agent_entrypoints` (map) replaced with a single `agent_entrypoint: AGENTS.md`; added a `standards:` block (`agents_md`, `spec_kit.pinned_version: specify-cli==1.0.8`, `spec_kit.memory`, `skills` paths); `context.constitution` replaced with `context.specify_constitution` and `context.documentation_policy`.
  - `docs/architecture/{repository-structure,agent-context-model}.md` updated to the new shape (single adapter, `.specify/memory/constitution.md`, no `specs/<NNN-feature>/` yet since no Spec Kit feature is active). `docs/architecture/overview.md` needed no change — it has no ADS-convention references, only product/architecture facts.
  - This project has no `.ai/skills/` directory, so `ADR-0012`'s directory move had nothing to migrate.
  - Fixed stale `CLAUDE.md` references in `README.md` and `docs/product/goals.md` (and their `.ko.md` companions).
  - Every touched document's `.ko.md` companion was updated in the same change; `scripts/check-ko-companions.sh --missing-only` passes clean (0 missing).
  - Deliberately not done: actually running `specify init` / installing the pinned Spec Kit CLI (`specify-cli==1.0.8`) — see "Known constraints" below.

## In progress

- None currently. See Next.

## Next

1. Ordinary feature/content work from here — no remaining foundation or deployment-pipeline gaps.
2. Run the real, pinned Spec Kit CLI (`uv tool install specify-cli==1.0.8`, then `specify init --here --integration claude --integration codex`) once a working Python/`uv`/`pipx` toolchain is available in this environment, to actually generate `.specify/`'s templates/scripts and the real `.claude/skills/speckit-*/SKILL.md` / `.agents/skills/speckit-*/SKILL.md` files — not hand-written, per `agent-dev-starter`'s `ADR-0010`. `.specify/memory/constitution.md` was hand-drafted for this migration and should be reconciled with whatever `specify init` generates there.

## Open decisions

- The `external` field on `Service` has no defined behavior yet (see `docs/product/scope.md`).
- Whether a `planned` (pre-launch) entry should ever be shown, or a service should only appear once it's real (see `docs/product/scope.md`).
- Whether `descriptionEn` should become a required field as more services are added (see `docs/product/scope.md`).
- `kioti-crm-discount`'s TLS/HTTPS listener was found to be missing from the live Gateway during this work (unrelated to entrance, noted in `cleanbrain-me-infra`'s README) — not this repository's concern, but flagged for awareness.

## Known constraints

- No backend, database, or authentication by design (see `docs/product/scope.md`).
- Target cluster is 2 vCPU / 4 GB RAM / 40 GB disk (per `cleanbrain-me-infra`) — the combined CPU limit across all services now exceeds the box's vCPU count (ceiling, not reservation — see that repo's "Resource budget"), so stay lightweight.
- This repository owns application source, Dockerfile, and CI; `cleanbrain-me-infra` owns the production Kubernetes manifest — the two must not duplicate each other's content.
- The CI deployment identity (`ci-deployer` in `cleanbrain-me-entrance` namespace) follows the same least-privilege model as `english-core-speaking`'s — a separate RBAC identity, not a widened shared one.
- The GitHub Spec Kit CLI (`specify-cli==1.0.8`, pinned in `PROJECT.yaml`'s `standards.spec_kit.pinned_version`) has not actually been installed or run in this repository. This session had no working Python/`uv`/`pip` toolchain (only a non-functional Windows Store stub `python.exe`), so `.specify/memory/constitution.md` was hand-drafted from `.ai/constitution/engineering-principles.md`'s content rather than generated by `specify init`, and no `.specify/` templates/scripts or real `.claude/skills/speckit-*`/`.agents/skills/speckit-*` files exist yet. This is a real, known gap, not something to fake around (`agent-dev-starter`'s `ADR-0010`) — see "Next".

## Exit criteria for this phase

- A fresh agent session, given only `AGENTS.md` or `CLAUDE.md`, correctly answers the five acceptance questions in `docs/product/goals.md`, each traceable to a repository path. (Met.)
- The foundation and MVP are committed as a reviewable baseline. (Met.)
- Dockerfile and CI workflow exist in this repository and have been verified to build successfully via GitHub Actions. (Met.)
- The corresponding `cleanbrain-me-infra` manifest exists and the service is reachable at `https://cleanbrain.me`. (Met.)
- CI-driven deploys (`ENABLE_PRODUCTION_DEPLOY=true`) are verified working end to end. (Met.)
