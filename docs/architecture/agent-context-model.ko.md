> 이 문서는 [`agent-context-model.md`](agent-context-model.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다. Agent bootstrap은 이 번역본이 아니라 영어 원본을 읽습니다.

# Agent Context Model

## Context classes

### Permanent context

프로젝트 목적, scope, architecture, engineering 원칙, 승인된 decision을 포함해 세션 간 지속되는 정보입니다. `PROJECT.yaml`, `.specify/memory/constitution.md`, `.ai/constitution/documentation-policy.md`, `docs/product/`, `docs/architecture/`, `docs/decisions/`에 저장합니다.

### Working context

현재 phase, 최근 완료된 작업, 다음 action, open decision을 포함해 진행 상황에 따라 변하는 정보입니다. `docs/status/current-state.md`에 저장합니다. 이 프로젝트는 아직 GitHub Spec Kit `specs/<NNN-feature>/` 디렉토리가 없습니다 — feature 단위의 spec/plan/tasks 세트가 없으므로, 그런 것이 생기기 전까지는 `docs/status/current-state.md`가 유일한 working-context source입니다.

### Task context

현재 사용자 요청, 관련 code, 임시 research 결과입니다. 필요할 때만 로드합니다. durable한 가치를 갖게 되면 적절한 permanent 또는 working source에 영속화합니다.

## Bootstrap order

1. `AGENTS.md`(모든 supported agent를 위한 유일한 adapter)에서 시작합니다.
2. `PROJECT.yaml`을 읽어 프로젝트, phase, pinned standard version을 파악합니다.
3. behavioral boundary를 이해하기 위해 `.specify/memory/constitution.md`(그리고 문서 관련 사항은 `.ai/constitution/documentation-policy.md`)를 읽습니다.
4. `docs/status/current-state.md`를 읽어 현재 위치, 다음 작업, Spec Kit feature가 활성 상태인지(현재는 없음)를 파악합니다.
5. `docs/product/`를 읽어 목적과 scope를 이해합니다.
6. `docs/architecture/`를 읽어 구조와 책임을 이해합니다.
7. 현재 작업과 관련된 `docs/decisions/` 아래 승인된 ADR을 읽습니다.
8. 요청과 관련된 repository 증거를 확인합니다.
9. 계획하고, 변경하고, 검증하고, 검토합니다.
10. durable decision과 working-state 변경을 repository에 영속화합니다.

## Conflict handling

- 사용자 요청은 작업 목표를 정의하지만, 승인된 architecture를 조용히 무시하지 않습니다.
- 구체적으로 승인된 ADR은 일반적인 architecture 설명보다 우선합니다.
- `current-state.md`는 원칙이나 설계를 재정의하지 않습니다.
- 해결되지 않은 충돌은 assumption 뒤에 숨기지 말고 보고합니다.

## Bootstrap acceptance test

clean session에서 `AGENTS.md`만 제공하고 외부 링크는 제공하지 않습니다. agent가 `docs/product/goals.md`("Success criteria")의 다섯 가지 acceptance question에 답하되, 모든 답변이 repository documentation으로 추적 가능할 때 context recovery가 성공한 것입니다.
