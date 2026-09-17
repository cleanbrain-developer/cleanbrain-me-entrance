> 이 문서는 [`documentation-policy.md`](documentation-policy.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# Documentation Policy

## Authority

> 대화는 일시적입니다. Repository가 authoritative합니다.

대화와 외부 링크는 discovery나 bootstrap의 입력이 될 수 있지만, 장기적인 dependency는 아닙니다. durable agreement는 repository에 영속화되기 전까지는 완료된 것이 아닙니다.

## Single responsibility

- 프로젝트 identity와 구조화된 phase: `PROJECT.yaml`
- 제품 목적, goals, scope: `docs/product/`
- 구조와 context model: `docs/architecture/`
- 중요한 decision과 근거: `docs/decisions/`
- 현재 진행 상황, 다음 작업, open decision: `docs/status/current-state.md`
- durable한 development 원칙: `.ai/constitution/`
- 도구별 bootstrap 차이: `AGENTS.md` / `CLAUDE.md`

같은 정책을 여러 파일에 중복하지 마세요. 요약이 유용한 경우, authoritative한 경로로 링크하세요.

## Decision records

배포 대상, service metadata schema, Entrance를 단순 static link launcher 이상으로 만드는 것과 같이 장기적 영향을 가지는 선택은 `docs/decisions/` 아래 ADR로 기록하세요. ADR은 context, decision, consequences, status를 포함해야 합니다. 승인된 ADR은 다른 ADR이 대체하기 전까지 유효합니다.

## Status hygiene

`current-state.md`는 회의록이나 전체 changelog가 아닙니다. 현재 phase를 재구성하는 데 필요한 완료된 작업, 진행 중인 작업, 다음 action, open decision만 유지하세요.

## Maintenance

code나 구조 변경으로 documentation이 사실과 달라지면, 같은 변경 안에서 documentation을 업데이트하세요. 오래된 guidance는 제거하고, 이력을 보존해야 할 때는 ADR이나 version control을 사용하세요.
