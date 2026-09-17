> 이 문서는 [`repository-structure.md`](repository-structure.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# Repository Structure

## Responsibility map

| Path | Owner responsibility | Must not become |
|---|---|---|
| `README.md` | 사람을 위한 소개, dev/build command, canonical 문서로의 navigation | 전체 design specification |
| `PROJECT.yaml` | 구조화된 프로젝트 identity와 phase | narrative architecture document |
| `AGENTS.md` | Codex-compatible bootstrap adapter | 공용 정책 source |
| `CLAUDE.md` | Claude Code bootstrap adapter | `AGENTS.md`의 중복 |
| `.ai/constitution/` | durable한 engineering 및 agent 원칙 | product feature 요구사항 |
| `docs/product/` | 문제, 사용자, goals, scope | implementation instruction |
| `docs/architecture/` | 구조, 경계, context model | decision history |
| `docs/decisions/` | 중요한 decision과 근거 | mutable한 current-state checklist |
| `docs/status/current-state.md` | 현재 phase, 진행 상황, 다음 작업 | 영구 정책이나 changelog |
| `src/config/services.ts` | service metadata(단일 source) | presentation logic |
| `src/components/` | service metadata의 presentation | service data 정의 |

## Dependency direction

Adapter와 요약은 authoritative document를 안쪽으로 가리킬 수 있습니다. authoritative document는 adapter의 표현이나 외부 대화 기록에 의존하지 않습니다.

```text
README ──────────────┐
AGENTS / CLAUDE ──────┼──> PROJECT.yaml + constitution + docs
current-state ────────┘                 │
                                         └──> accepted ADRs
```

`PROJECT.yaml`은 discovery를 위한 canonical location을 나열하지만 그 narrative content를 중복하지 않습니다.

## Directory policy

파일이 그 안에서 실제 responsibility를 가질 때만 디렉토리를 추가합니다. `docs/guides/`는 의도적으로 존재하지 않습니다 — 이 repository는 아직 그것이 필요한 반복 가능한 운영 절차가 없으며, starter 자체를 배포하지도 않습니다.

## Evolution rule

top-level 영역이나 responsibility layer를 추가하기 전에, 기존 위치가 이를 표현할 수 없는지 확인하세요. `cleanbrain-me-infra`와의 배포 경계 변경, 또는 config-driven service metadata model의 변경은 `docs/decisions/` 아래 ADR을 필요로 합니다.
