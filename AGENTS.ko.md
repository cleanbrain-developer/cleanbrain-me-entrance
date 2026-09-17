> 이 문서는 [`AGENTS.md`](AGENTS.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다. Agent bootstrap은 이 번역본이 아니라 영어 원본을 읽습니다.

# Codex Project Adapter

이 파일은 Codex-compatible agent를 위한 repository entry point입니다. 프로젝트 정책이나 설계를 여기에 중복해서 두지 마세요. 공유 source of truth는 아래에 나열되어 있습니다.

## Context bootstrap

먼저 `PROJECT.yaml`을 읽고, 그다음 `docs/architecture/agent-context-model.md`에 정의된 bootstrap 순서와 conflict-handling 규칙을 따르세요. 이 adapter는 그 순서를 다시 서술하지 않습니다 — 이 목록과 해당 문서가 서로 다를 경우 `agent-context-model.md`가 우선합니다.

## Working contract

- 계획을 세우거나 무언가를 바꾸기 전에 repository 증거를 먼저 확인합니다.
- 요청을 충족하는 가장 작고 일관된 변경을 선호합니다.
- architecture를 절대 조용히 바꾸지 않습니다. 중요한 결정은 ADR에 기록합니다.
- 완료를 주장하기 전에 가능한 검증을 수행하고, 검증된 결과와 검증되지 않은 항목을 구분합니다.
- durable decision과 working-state 변경은 같은 변경 안에서 올바른 source of truth에 영속화합니다.
- 대화 기록이나 이 adapter를 장기적인 design source로 취급하지 않습니다.

현재 phase와 다음 작업의 source of truth로는 항상 `docs/status/current-state.md`를 사용하세요.
