> 이 문서는 [`repository-structure.md`](repository-structure.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# Repository Structure

## Responsibility map

| Path | Owner responsibility | Must not become |
|---|---|---|
| `README.md` | 사람을 위한 소개, dev/build command, canonical 문서로의 navigation | 전체 design specification |
| `PROJECT.yaml` | 구조화된 프로젝트 identity, phase, pinned standard version | narrative architecture document |
| `AGENTS.md` | 모든 supported agent를 위한 유일한 bootstrap adapter이자 behavioral contract | 공용 정책 source, 또는 여러 중복 adapter 중 하나 |
| `.specify/memory/constitution.md` | durable한 engineering 원칙(GitHub Spec Kit 자체의 constitution 역할) | product feature 요구사항 |
| `.ai/constitution/documentation-policy.md` | 문서 소유권과 `.ko.md` language policy — 어떤 open standard도 이를 소유하지 않음 | product feature 요구사항이나 engineering 원칙(이들은 `.specify/memory/constitution.md`에 있음) |
| `docs/product/` | 문제, 사용자, goals, scope | implementation instruction |
| `docs/architecture/` | 구조, 경계, context model | decision history |
| `docs/decisions/` | 중요한 decision과 근거 | mutable한 current-state checklist |
| `docs/status/current-state.md` | 현재 phase, 진행 상황, 다음 작업 | 영구 정책이나 changelog |
| `src/config/services.ts` | service metadata(단일 source) | presentation logic |
| `src/components/` | service metadata의 presentation | service data 정의 |

## Dependency direction

`AGENTS.md`와 요약은 authoritative document를 안쪽으로 가리킬 수 있습니다. authoritative document는 adapter의 표현이나 외부 대화 기록에 의존하지 않습니다.

```text
README ──────────────────┐
AGENTS.md ────────────────┼──> PROJECT.yaml + .specify/memory/constitution.md + docs
current-state.md ─────────┘                 │
                                            └──> accepted ADRs
```

`PROJECT.yaml`은 discovery를 위한 canonical location을 나열하지만 그 narrative content를 중복하지 않습니다.

## Directory policy

파일이 그 안에서 실제 responsibility를 가질 때만 디렉토리를 추가합니다. `docs/guides/`는 의도적으로 존재하지 않습니다 — 이 repository는 아직 그것이 필요한 반복 가능한 운영 절차가 없으며, Starter 자체를 배포하지도 않습니다. `.specify/`(`memory/constitution.md`를 넘어선 나머지)와 `specs/`는 pinned GitHub Spec Kit CLI(`specify-cli==1.0.8`, `PROJECT.yaml`의 `standards.spec_kit` 참고)를 실행함으로써 설치되어야 하며 — 그 설치는 아직 보류 중이고(`docs/status/current-state.md`의 "Known constraints" 참고) 손으로 작성할 대상이 아닙니다. `.claude/skills/`/`.agents/skills/`는 실제로 반복 가능한 workflow가 그것을 위해 기술된 경우에만 project-specific skill을 담을 수 있습니다 — 절대 만들어낸 `.ai/skills/` 경로가 아니며, 절대 speculative한 placeholder도 아닙니다; 이 repository는 현재 아무것도 없습니다.

## Evolution rule

top-level 영역이나 responsibility layer를 추가하기 전에, 기존 위치(open standard 자체의 디렉토리를 포함)가 이를 표현할 수 없는지 확인하세요. `cleanbrain-me-infra`와의 배포 경계 변경, 또는 config-driven service metadata model의 변경은 `docs/decisions/` 아래 ADR을 필요로 합니다.
