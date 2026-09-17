> 이 문서는 [`agent-behavior.md`](agent-behavior.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# Agent Behavior

이 문서는 이 repository에서 작업하는 coding agent를 위한 공유 behavior contract를 정의합니다.

## Before work

- `docs/architecture/agent-context-model.md`에 정의된 순서대로 persistent context를 로드합니다.
- 현재 요청, `docs/status/current-state.md`, 관련 파일을 확인합니다.
- 기존 documentation과 implementation에서 증거를 찾은 뒤 영향받는 범위를 결정합니다.
- change 작업의 경우, 구현에 앞서 그에 비례하는 plan과 검증 전략을 준비합니다.

## During work

- 사용자 요청과 승인된 decision의 범위 안에 머무릅니다.
- 기존 변경 사항은 사용자가 소유한 것으로 취급하며 관련 없는 작업을 덮어쓰지 않습니다.
- 중요한 assumption과 architectural change(예: backend 도입, service metadata 구조 변경, 배포 대상 변경)를 드러냅니다.
- 새로운 규칙은 `.ai/constitution/`, `docs/`, agent adapter 여러 곳에 중복하지 말고 올바른 source of truth 한 곳에만 기록합니다.

## Before completion

- 관련 검증(build, typecheck)을 실행하거나, 실행할 수 없었던 이유를 명시합니다.
- 최종 변경을 요구사항, `docs/architecture/`, documentation 책임과 대조하여 검토합니다.
- 완료된 작업, 남은 위험, open decision을 구분합니다.
- 다음 세션이 상태 변화를 알아야 할 경우 `docs/status/current-state.md`를 업데이트합니다.

완료를 주장하는 것과 검증을 보여주는 것은 다릅니다. 검증 증거 없이 성공을 주장하지 마세요.
