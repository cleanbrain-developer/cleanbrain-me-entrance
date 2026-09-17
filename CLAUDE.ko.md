> 이 문서는 [`CLAUDE.md`](CLAUDE.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다. Agent bootstrap은 이 번역본이 아니라 영어 원본을 읽습니다.

# Claude Code Project Adapter

이 파일은 Claude Code를 위한 repository entry adapter입니다. 공유 정책이나 프로젝트 설계의 source of truth가 아니며, 아래의 repository context로 Claude Code를 안내하는 역할만 합니다.

## Required context

먼저 `PROJECT.yaml`을 읽고, 그다음 `docs/architecture/agent-context-model.md`에 정의된 bootstrap 순서와 conflict-handling 규칙을 따르세요. 이 adapter는 그 순서를 다시 서술하지 않습니다 — 이 목록과 해당 문서가 서로 다를 경우 `agent-context-model.md`가 우선합니다.

## Working contract

- 기존 증거를 확인하고 change plan을 준비합니다.
- 가장 작고 일관된 변경을 구현하고, 검증한 뒤, 최종 diff를 검토합니다.
- architecture decision이나 durable state를 대화 기록에만 남기지 않습니다.
- 공유 규칙은 이 adapter가 아니라 적절한 constitution 또는 documentation source에 추가합니다.
- 해결되지 않은 충돌과 open decision은 assumption으로 조용히 처리하지 말고 명시적으로 드러냅니다.

현재 phase와 다음 작업의 source of truth로는 `docs/status/current-state.md`를 사용하세요.
