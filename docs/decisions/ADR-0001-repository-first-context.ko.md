> 이 문서는 [`ADR-0001-repository-first-context.md`](ADR-0001-repository-first-context.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# ADR-0001: Repository-First Context

- Status: Accepted
- Date: 2026-09-09
- Deciders: cleanbrain.developer

## Context

이 프로젝트의 개발은 여러 세션에 걸쳐, 그리고 잠재적으로 서로 다른 coding agent(Claude Code, Codex-compatible agent)에 걸쳐 이루어집니다. 프로젝트 의도, architecture, working state가 대화 기록에만 존재한다면, 세션이 끝나거나 agent가 바뀔 때 그것들은 사라지고, 매번 새 세션이 처음부터 다시 briefing 받아야 합니다.

## Decision

repository를 persistent한 프로젝트 context의 authoritative source로 사용합니다.

- `PROJECT.yaml`에 프로젝트 identity를 구조화합니다.
- durable한 원칙은 `.ai/constitution/`에 저장합니다.
- product 및 architecture 설명은 `docs/` 아래에 저장합니다.
- 중요한 decision과 근거는 `docs/decisions/` 아래 ADR에 저장합니다.
- working state는 `docs/status/current-state.md`에 저장합니다.
- `AGENTS.md`와 `CLAUDE.md`는 공유 core를 로드하는 thin한 agent별 adapter로 유지합니다.
- 이 repository를 형성한 대화(이 ADR을 만든 대화 포함)는, 그 decision이 여기 영속화된 이후에는 bootstrap 입력으로만 취급하고 장기적인 dependency로 취급하지 않습니다.

## Consequences

### Positive

- 새 세션과 다른 agent가 이전 대화 없이도 작업을 이어갈 수 있습니다.
- 공유 정책이 하나의 source를 가지므로 `AGENTS.md`와 `CLAUDE.md` 사이의 adapter drift가 줄어듭니다.
- decision, working state, task prompt가 서로 다른 lifetime과 responsibility를 가집니다.

### Costs and risks

- code와 documentation을 함께 유지해야 하며, 그렇지 않으면 repository는 context로서 신뢰할 수 없게 됩니다.
- bootstrap 순서를 무시하는 agent는 중요한 context를 놓칠 수 있습니다.
- Markdown 규칙만으로는 준수를 보장할 수 없습니다 — 절대 위반되어서는 안 되는 규칙에는 나중에 deterministic gate(test, lint, CI)가 필요할 것입니다.

## Alternatives considered

### Large reusable initialization prompt

시작하기는 쉽지만, 지나치게 큰 prompt와 대화 및 도구에 대한 dependency를 만듭니다. 기각됨.

### Agent-specific documents as independent sources

도구별 최적화는 쉬워지지만, `AGENTS.md`와 `CLAUDE.md` 사이에 정책 중복과 drift를 만듭니다. 기각됨.
