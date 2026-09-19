> 이 문서는 [`README.md`](README.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# cleanbrain-me-entrance

`cleanbrain.me` 루트 도메인을 위한 랜딩 페이지 — `cleanbrain.me` 아래에서 운영되는 서비스들을 나열하고 각 서비스로 링크를 연결해주는 service directory입니다. reverse proxy나 gateway가 아닙니다.

프로젝트 컨텍스트(목적, 아키텍처, 현재 상태)는 이 파일이 아니라 repository 자체에 있습니다.

- [`PROJECT.yaml`](PROJECT.yaml) — 구조화된 identity와 현재 phase
- [`docs/product/`](docs/product/) — 문제, 사용자, goals, scope
- [`docs/architecture/`](docs/architecture/) — 구조와 경계
- [`docs/decisions/`](docs/decisions/) — 승인된 architecture decision
- [`docs/status/current-state.md`](docs/status/current-state.md) — 현재 진행 상황과 다음 작업
- [`AGENTS.md`](AGENTS.md) — agent bootstrap entry point

## Stack

Vue 3 + TypeScript + Vite. router나 state library 없음 — 단일 static page입니다.

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

Service metadata는 UI 컴포넌트와 분리되어 [`src/config/services.ts`](src/config/services.ts)에서 관리됩니다 — `docs/architecture/overview.md` 참고.

## Container / CI

`Dockerfile`은 static bundle을 빌드하고 nginx(`nginx.conf`)로 서빙합니다. `.github/workflows/deploy.yml`은 `main`에 push할 때마다 image를 빌드해 GHCR에 push하고, `cleanbrain-me-infra`의 manifest가 존재하며 `ENABLE_PRODUCTION_DEPLOY` repository variable이 설정된 경우 SSH로 배포합니다 — 정확한 rollout 순서는 `docs/status/current-state.md` 참고.

## Status

MVP, Dockerfile, CI workflow가 구현되어 있습니다. `cleanbrain-me-infra`와의 Kubernetes 배포 연동은 아직 시작되지 않았습니다 — 다음 작업은 `docs/status/current-state.md` 참고.
