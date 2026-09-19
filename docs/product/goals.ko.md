> 이 문서는 [`goals.md`](goals.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# Goals

## V1 goals

1. `cleanbrain.me`에 첫 방문자가 몇 초 안에 이해할 수 있는 root-domain 페이지를 제공합니다.
2. 나열된 모든 service를 이름, 짧은 description, 현재 status, 원클릭 경로로 표현합니다.
3. service metadata를 config-driven하게 유지하여 service 추가가 절대 UI 컴포넌트를 건드리지 않도록 합니다.
4. `cleanbrain-me-infra` cluster의 2 vCPU / 4 GB RAM 제약에 맞는, 경량 container가 서빙할 수 있는 stateless static build로 출시합니다.
5. 나열된 모든 service의 implementation으로부터 decoupled 상태를 유지합니다 — Entrance는 절대 proxy, gateway, auth layer가 되지 않습니다.

## Success criteria

이전 대화 없이 오직 `AGENTS.md`에서 시작하는 새 agent 세션은 다음 질문에 정확히 답할 수 있어야 합니다.

- 이 프로젝트는 무엇이고, 의도적으로 하지 않는 것은 무엇인가?
- 왜 존재하는가?
- 핵심 원칙과 architecture는 무엇인가?
- 무엇이 완료되었고, 현재 phase는 무엇인가?
- 다음에 무엇이 일어나야 하는가?

모든 답변은 assumed context가 아니라 repository 경로(이 문서, `docs/architecture/`, `docs/status/current-state.md`, 또는 source tree)로 추적 가능해야 합니다.

## Long-term direction

static MVP가 배포되고 안정화된 이후의 잠재적인 미래 확장:

1. 수동으로 유지되는 `status` field 대신 health-check 기반의 live status.
2. static navigation을 넘어서는 모든 것 — proxying, auth, backend — 은 구체적인 요구사항이 문서화된 architecture decision을 강제하지 않는 한 무기한 scope 밖입니다(`docs/architecture/overview.md`와 `docs/decisions/` 참고).

이 순서는 방향성일 뿐, commitment가 아닙니다.

Service categorization은 더 이상 speculative하지 않습니다: `Service.category`는 오늘의 단일 category를 포함해 항상 UI(`ServiceGrid.vue`)에서 라벨이 붙은 section으로 그룹화되므로, 더 많은 category가 생긴 뒤에야 구조가 나타나는 것이 아니라 처음부터 구조가 드러납니다.
