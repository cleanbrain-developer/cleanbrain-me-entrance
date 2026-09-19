> 이 문서는 [`AGENTS.md`](AGENTS.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다. Agent bootstrap은 이 번역본이 아니라 영어 원본을 읽습니다.

# AGENTS.md

이 파일은 Claude Code, Codex, 또는 `AGENTS.md`를 읽는 다른 모든 도구를 포함해, 이 repository에서 작업하는 모든 coding agent를 위한 단일하고 agent-agnostic한 entry point입니다. product, architecture, 원칙의 source of truth는 아니며, 그것들로 라우팅하고 여기서 모든 agent가 따르는 behavioral contract를 명시합니다.

## Context bootstrap

먼저 `PROJECT.yaml`을 읽고, 그다음 `docs/architecture/agent-context-model.md`에 정의된 bootstrap 순서와 conflict-handling 규칙을 따르세요. 이 파일은 그 순서를 다시 서술하지 않습니다 — 이 section과 해당 문서가 서로 다를 경우 `agent-context-model.md`가 우선합니다.

## Working contract

### Before work

- `agent-context-model.md`가 정의하는 순서대로 persistent context를 로드합니다.
- 현재 요청, `docs/status/current-state.md`, 관련 파일을 확인합니다.
- 변경을 제안하기 전에 기존 documentation과 implementation에서 증거를 찾습니다.
- change 작업의 경우, 구현에 앞서 그에 비례하는 plan과 검증 전략을 준비합니다.

### During work

- 사용자 요청과 승인된 decision의 범위 안에 머무릅니다. 기존 변경 사항은 사용자가 소유한 것으로 취급합니다.
- 중요한 assumption과 architectural change(예: backend 도입, service metadata 구조 변경, 배포 대상 변경)를 조용히 결정하지 말고 드러냅니다.
- 새로운 규칙은 이 파일이 아니라, 올바른 source of truth 한 곳에만 기록합니다.

### Before completion

- 관련 검증(build, typecheck)을 실행하거나 실행할 수 없었던 이유를 명시합니다. green automated check와 실제로 동작 중인 시스템에 대한 직접 검증을 구분합니다.
- 최종 변경을 요구사항, architecture, documentation 책임과 대조하여 검토합니다.
- 다음 세션이 상태 변화를 알아야 할 경우 `docs/status/current-state.md`를 업데이트합니다.
- 이 변경이 `.ko.md` companion을 가진 문서를 수정했다면, 같은 변경 안에서 companion을 업데이트합니다 — 오래된 번역은 defect이며, 나중에 처리할 follow-up task가 아닙니다.

완료를 주장하는 것과 검증을 보여주는 것은 다릅니다. 검증 증거 없이 성공을 주장하지 마세요.

## Conflict handling

- 사용자 요청은 작업 목표를 정의하지만, 승인된 architecture를 조용히 무시하지 않습니다.
- 구체적으로 승인된 ADR은 일반적인 architecture 설명보다 우선합니다.
- `current-state.md`는 원칙이나 설계를 재정의하지 않습니다.
- 해결되지 않은 충돌은 assumption 뒤에 숨기지 말고 보고합니다.

현재 phase와 다음 작업의 source of truth로는 `docs/status/current-state.md`를 사용하세요.
