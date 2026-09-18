> 이 문서는 [`current-state.md`](current-state.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# Current State

Last updated: 2026-09-17

## Current phase

Deployed, CI-driven — `https://cleanbrain.me`는 production에서 live 상태이며, `main`으로의 일반적인 push는 이제 end to end로 자동 배포됩니다(검증됨). 이 phase의 원래 exit criteria는 모두 충족되었으며, 다음 phase는 일반적인 feature 작업입니다.

## Completed

- 프로젝트 이름 `cleanbrain-me-entrance`를 정하고 Vue 3 + TypeScript + Vite 프로젝트를 scaffold함(router 없음, state library 없음 — single page).
- "New project" 모드로 `agent-dev-starter`의 adoption guide를 따라 repository-first context 구조를 채택: `PROJECT.yaml`, `.ai/constitution/`, `docs/product/`, `docs/architecture/`, `docs/decisions/ADR-0001-repository-first-context.md`, `AGENTS.md`, `CLAUDE.md`, 그리고 이 파일 — application code 구현 이전에.
- ADR-0001(repository-first context)을 `cleanbrain.developer`를 decider로 하여 accepted로 기록함.
- maintainer와 함께 `.ai/constitution/`을 검토하고 확정함.
- Entrance MVP 구현: `Service` type(`src/types/service.ts`), `english-core-speaking`(active)과 `developer`(planned)를 포함한 초기 service list(`src/config/services.ts`), `ServiceCard.vue`/`ServiceGrid.vue`, `prefers-color-scheme`을 통한 light/dark styling을 가진 `App.vue` shell.
- `vue-tsc -b`(typecheck)와 `npm run build` 모두 통과함을 검증함.
- `CLAUDE.md`에서만 시작하는 새롭고 격리된 agent 세션에서 bootstrap acceptance test를 실행함 — `docs/product/goals.md`의 다섯 가지 acceptance question 모두 repository-path citation과 함께 정확히 답변되었으며 gap이나 추측이 없었음.
- git을 로컬에서 초기화하고, foundation + MVP를 commit하고, public GitHub repository `cleanbrain-developer/cleanbrain-me-entrance`를 만들어 `main`에 push함.
- `english-core-speaking` / `kioti-crm-discount-enhance-demo`의 CI/CD model에 맞춰 `Dockerfile`, `nginx.conf`, `.dockerignore`, `.github/workflows/deploy.yml`(test → build/push GHCR → SSH deploy, `ENABLE_PRODUCTION_DEPLOY`로 gated)을 추가함.
- GHCR package(`ghcr.io/cleanbrain-developer/cleanbrain-me-entrance`)가 public임을 확인함 — `imagePullSecrets`가 필요 없음.
- `english-core-speaking`의 기존 CI SSH keypair(같은 서버, 같은 `deploy` Linux 계정)를 재사용하여 이 repository에 `HETZNER_SSH_HOST`/`USER`/`PORT`/`PRIVATE_KEY`/`KNOWN_HOSTS` GitHub Actions secret을 설정함.
- `cleanbrain-me-infra`: `kubernetes/namespaces/cleanbrain-me-entrance.yaml`과 `kubernetes/apps/entrance/{rbac,deployment,service,httproute}.yaml`을 추가함.
- apex `cleanbrain.me` A record가 이미 존재함을 확인함(DNS는 blocker가 아니었음).
- live Gateway의 TLS 메커니즘이 수동으로 적용된 `Certificate` object가 아니라 cert-manager의 Gateway API 통합("Gateway Shim": HTTPS listener마다 `Certificate`가 자동 발급되고 Gateway가 소유함)임을 발견함. live `cleanbrain-me-gateway` Gateway에 새로운 `entrance-https` listener(hostname `cleanbrain.me`, `certificateRefs: [cleanbrain-me-entrance-tls]`)를 추가함; cert-manager가 자동 발급했고 certificate는 `Ready` 상태임.
- cluster administrator로서 `namespace` → `rbac` → `deployment` → `service` → `httproute`를 live cluster에 적용함. `pod/web`은 `Running 1/1`, `httproute/entrance`는 `Accepted: True` / `ResolvedRefs: True`.
- 세 번째 application의 CI ServiceAccount token(`ci-deployer-cleanbrain-me-entrance-token`)을 만들고, 기존 `current-context`를 건드리지 않으면서 `english-core-speaking`의 것과 나란히 `/home/deploy/.kube/config`에 context를 병합함. 검증됨: `kubectl auth whoami` → `system:serviceaccount:cleanbrain-me-entrance:ci-deployer`; `can-i patch deployment/web` → `yes`; `can-i get secrets` → `no`.
- `ENABLE_PRODUCTION_DEPLOY=true`로 설정하고 실제 workflow run(`34362967974`)을 트리거함: `test` → `build-and-push` → `deploy` 모두 성공하여, CI의 SSH → `kubectl set image` → `rollout status` 경로가 이론상으로만이 아니라 end to end로 실제로 동작함을 확인함.
- **두 번 end to end로 검증됨**: `curl -I https://cleanbrain.me`는 CI-driven 배포 전후 모두 `HTTP/2 200`을 반환함. service directory는 동작하는 CI/CD pipeline과 함께 production에서 live 상태임.
- `src/config/services.ts`에서 `developer` placeholder를 제거함 — 해당 프로젝트는 아직 시작되지 않았고, 존재하지 않는 service에 대한 `planned` entry는 live production 페이지에서 오해를 불러일으켰음. 이제 `english-core-speaking`만 나열됨.
- `Service` 형태의 data와 UI의 그룹화 동작에 `category`를 추가함: `ServiceGrid.vue`는 이제 오늘의 단일 `"Learning"` category(`english-core-speaking`)를 포함해 항상 표시되는 heading을 가진 section으로 `category`별로 서비스를 나눔(first-seen order) — 이후 더 많은 category가 추가되어도 layout의 구조가 바뀌지 않도록 함.
- UI/UX 개선: card에 hover elevation(단순 border color 변경이 아니라 shadow), keyboard navigation을 위한 `:focus-visible` outline, status badge color를 위한 dark-mode-aware CSS variable(이전에는 dark mode 대비가 약한 hardcode된 light-mode hex 값이었음).
- `cleanbrain-me-developer`가 실제로 동작하는 CI/CD pipeline과 함께 production에서 live 상태가 되었으므로, `src/config/services.ts`에 실제 `developer` entry(`https://developer.cleanbrain.me`, category `"Portfolio"`, status `active`)를 추가함 — 이번에는 앞서 이전 placeholder를 제거했을 때 기록된 decision에 따라 `planned` placeholder가 아님. `ServiceGrid.vue`는 이제 두 개의 category section(`Portfolio`, `Learning`)을 렌더링함. 검증됨: `vue-tsc -b`/`npm run build` 통과, 실제 브라우저 스크린샷으로 card가 올바르게 렌더링되고 링크가 `https://developer.cleanbrain.me/`로 이어짐을 확인함.
- 브라우저 locale 기반 internationalization을 추가함: `src/i18n/locale.ts`(`navigator.languages`로부터 `detectLocale()`, 한국어 vs 영어 fallback), `src/i18n/strings.ts`(UI chrome 문자열), `Service.descriptionEn`(선택적인 service별 영어 description, 없으면 한국어 `description`으로 fallback). `App.vue`는 mount 시점에 `document.documentElement.lang`과 meta description을 설정함. headless-browser check(Playwright, 임시 — 프로젝트 dependency로 추가되지 않음)로 세 가지 `context.locale` 값에 대해 검증함: `ko-KR`은 한국어를 렌더링하고, `en-US`와 `ja-JP`(비한국어)는 모두 영어를 렌더링함 — DOM text assertion과 스크린샷 모두로 확인함.
- `ServiceGrid.vue`의 category ordering을 수정함: 이전에는 `services.ts`의 first-seen order(의도된 선택이 아니라 implementation detail)로 정렬되어, maintainer가 알파벳 순서를 기대했음에도 `Portfolio`가 `Learning`보다 앞에 왔음. 이제 `localeCompare`로 category 이름을 정렬함 — `Learning`이 `Portfolio`보다 앞에 오며, service가 config에 추가되는 순서와 무관하게 올바른 상태를 유지함.
- production을 대상으로 한 임시 Playwright + axe-core check를 통해 desktop/mobile, light/dark, ko/en 전반에 걸친 전체 review pass(code review + 실제 스크린샷)를 실행하고 발견된 사항을 수정함: (1) `--text-secondary` 위의 `.visitor-count`의 `opacity: 0.8`이 WCAG AA contrast를 통과하지 못함(axe `serious` violation) — 제거함; (2) visitor-count 텍스트가 header의 `.subtitle` 문단에 inline으로 추가되어 mobile에서 어색하게 줄바꿈됨(외로운 숫자 하나가 자기 줄에 남음) — 별도의 `<p class="visitor-count">` block으로 이동함; (3) `index.html`에 Open Graph/Twitter Card meta tag가 없어서, bare `cleanbrain.me` 링크를 공유할 때(Slack, KakaoTalk 등) title/description/image preview가 보이지 않음 — static한 한국어 기본 `og:*`/`twitter:*` tag와 `theme-color`를 추가함(이 앱이 의도적으로 갖지 않은 SSR 없이는 방문자별 locale이 될 수 없음); (4) `ServiceCard.vue`의 service-name heading이 `<h2>`였는데, 그것이 nesting되어 있는 `ServiceGrid.vue`의 category-section `<h2>`와 충돌함 — `<h3>`로 변경하고 이후 실제 DOM에서 `H1 > H2 > H3`를 검증함; (5) external service link(`target="_blank"`)가 새 탭에서 열린다는 접근성 안내가 없었음 — `style.css`에 새로운 `.sr-only` utility class를 통해 시각적으로 숨겨진 `(opens in a new tab)`/`(새 탭에서 열림)` 문자열을 추가함; (6) `"General"`/미분류 category fallback label이 locale과 무관하게 영어로 hardcode되어 있었음 — `strings.ts`의 `uncategorized`로 옮김. 이후 axe-core를 재실행한 결과: violation 0건(1건에서 감소).

- 위에서 보류되었던 항목에 대한 maintainer의 decision에 따라 header에 수동 KO/EN toggle을 추가함. `locale`은 plain constant 대신 `ref<Locale>`이 되었으며, 저장된 선택(`loadStoredLocale()`)에서 seed되고 없으면 `detectLocale()`로 fallback하므로 첫 방문자에 대한 기본 동작(한국에서는 한국어, 그 외에는 영어)은 변하지 않음. KO/EN을 클릭하면 `setLocale()`이 호출되어 ref를 업데이트하고(하위 모든 것은 기존 `:locale` prop chain을 통해 반응함) `storeLocale()`을 통해 선택을 `localStorage`에 영속화하여 다음 방문 시 기억되도록 함 — storage access가 throw할 수 있으므로 방어적으로 wrapping됨. Playwright(임시, 프로젝트 dependency 아님)로 검증함: `ko-KR` 방문자는 기본적으로 한국어이며, EN으로 toggle하면 DOM(`lang`, subtitle, card action text)이 즉시 업데이트되고 페이지 reload 후에도 유지됨; `en-US` 방문자는 기본적으로 영어이며 KO로 다시 toggle할 수 있음; axe-core는 toggle된 상태에서 violation 0건을 보였음.
- `agent-dev-starter`의 ADR-0004/ADR-0005 decision(bilingual documentation, mandatory and cascading)에 따라 이 repository의 모든 Markdown 문서에 대해 `.ko.md` Korean companion을 추가함(2026-09-17). 그 decision에 따라 `PROJECT.yaml`은 제외됨. 영어는 계속 canonical이며, agent bootstrap은 계속 영어 파일만 읽음.
- `agent-dev-starter`에서 `scripts/check-ko-companions.sh`를 복사하고, `.github/workflows/deploy.yml`의 `test` job에 `--missing-only`로 실행해서 `.ko.md` companion이 누락되면 build를 실패시키는 step을 추가함, `agent-dev-starter`의 `ADR-0009`에 따름(2026-09-18).

## In progress

- 현재 없음. Next 참고.

## Next

1. 여기서부터는 일반적인 feature/content 작업 — 남아 있는 foundation이나 배포 파이프라인 gap은 없음.

## Open decisions

- `Service`의 `external` field는 아직 정의된 동작이 없음(`docs/product/scope.md` 참고).
- `planned`(출시 전) entry를 언젠가 보여줄지, 아니면 service가 실재할 때만 나타나게 할지(`docs/product/scope.md` 참고).
- 더 많은 service가 추가됨에 따라 `descriptionEn`이 required field가 되어야 하는지(`docs/product/scope.md` 참고).
- 이 작업 중 `kioti-crm-discount`의 TLS/HTTPS listener가 live Gateway에서 누락되어 있음을 발견함(entrance와 무관하며, `cleanbrain-me-infra`의 README에 기록됨) — 이 repository의 관심사는 아니지만 인지를 위해 표시함.

## Known constraints

- 설계상 backend, database, authentication이 없음(`docs/product/scope.md` 참고).
- Target cluster는 2 vCPU / 4 GB RAM / 40 GB disk(`cleanbrain-me-infra` 기준)입니다 — 모든 service를 합친 CPU limit이 이제 박스의 vCPU 수를 초과하므로(reservation이 아니라 ceiling — 해당 repository의 "Resource budget" 참고), 가볍게 유지해야 함.
- 이 repository는 application source, Dockerfile, CI를 소유하고, `cleanbrain-me-infra`는 production Kubernetes manifest를 소유합니다 — 둘은 서로의 내용을 중복해서는 안 됩니다.
- CI 배포 identity(`cleanbrain-me-entrance` namespace의 `ci-deployer`)는 `english-core-speaking`과 같은 least-privilege model을 따릅니다 — 확장된 공유 identity가 아니라 별도의 RBAC identity입니다.

## Exit criteria for this phase

- `AGENTS.md` 또는 `CLAUDE.md`만 주어진 새로운 agent 세션이 `docs/product/goals.md`의 다섯 가지 acceptance question에 정확히 답하며, 각각 repository 경로로 추적 가능함. (충족됨.)
- foundation과 MVP가 검토 가능한 baseline으로 commit됨. (충족됨.)
- Dockerfile과 CI workflow가 이 repository에 존재하며 GitHub Actions를 통해 성공적으로 build됨이 검증됨. (충족됨.)
- 해당하는 `cleanbrain-me-infra` manifest가 존재하고 service가 `https://cleanbrain.me`에서 접근 가능함. (충족됨.)
- CI-driven 배포(`ENABLE_PRODUCTION_DEPLOY=true`)가 end to end로 동작함이 검증됨. (충족됨.)
