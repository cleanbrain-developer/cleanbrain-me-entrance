> 이 문서는 [`constitution.md`](constitution.md)의 한국어 번역본입니다. 영어 원본이 canonical이며, 충돌 시 영어 원본이 우선합니다.

# Constitution

이것은 GitHub Spec Kit이 사용하는 의미에서의 이 프로젝트의 constitution입니다: 이 repository의 모든 변경이 평가되는 durable한 원칙입니다. 기존 `.ai/constitution/engineering-principles.md`를 대체하며, 이제 이 원칙들이 사는 유일한 곳입니다.

## Evidence before change

기존 documentation과 implementation을 먼저 확인합니다. assumption보다 repository 증거를 우선하고, 검증되지 않은 구조를 근거로 변경을 제안하지 않습니다.

## Minimal, coherent change

요구사항을 충족하는 가장 작고 일관된 변경을 선호합니다. 이것은 platform이 아니라 single-page service directory입니다 — 실제 요구가 강제하기 전까지 backend, database, authentication, routing layer를 추가하지 않습니다.

## Explicit architecture

architectural boundary나 convention을 조용히 바꾸지 않습니다. 장기적 영향을 가지거나 되돌리기 어려운 decision(예: config-driven service metadata에서 벗어나는 것, Entrance를 proxy로 바꾸는 것)을 드러내고, 구현 전이나 구현과 함께 ADR에 기록합니다.

## Verifiable outcomes

검증 가능한 결과물을 만듭니다. build와 typecheck가 존재하면 실행하고, 그렇지 않다면 검증 방법과 그 한계를 명시합니다. 판단이 필요한 guidance와 code, test, linter, CI로 강제되어야 하는 규칙을 구분합니다.

## Agent-agnostic core

product intent, architecture, decision, 이 원칙들을 agent-specific instruction file에 묶어두지 않습니다. `AGENTS.md`는 모든 agent가 이 공유 source를 찾고 따르는 데 필요한 routing과 behavioral contract만을 담을 수 있습니다.

## Project-specific principles

프로젝트는 이 줄 아래에 자신만의 원칙을 추가할 수 있으며, 각각은 여기에 실제 prose 정의를 가져야 합니다 — `PROJECT.yaml`에만 있는 bare name은 허용되지 않습니다. 이 프로젝트는 두 가지를 추가했습니다.

### Config over code for service metadata

Service identity, description, status, URL은 UI 컴포넌트가 아니라 단일 config source에 있어야 합니다. 서비스를 추가하거나 업데이트하는 것이 presentation 컴포넌트를 건드리는 것을 요구해서는 안 됩니다.

### Separated boundaries

domain concern(service metadata, presentation)을 external system이나 tooling(build tool, container runtime, Kubernetes 배포)과 분리합니다. 배포와 infrastructure 관련 사항은 이 repository의 source tree가 아니라 `cleanbrain-me-infra` repository에 속합니다.
